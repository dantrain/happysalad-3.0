const path = require('path');
const fs = require('fs');
const times = require('lodash/times');
const take = require('lodash/take');
const lunr = require('lunr');
const { DateTime, Interval } = require('luxon');
let slugify;
const { countBy, tail } = require('lodash');

const globalContext = {};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  slugify = (await import('@sindresorhus/slugify')).default;

  const { errors, data } = await graphql(`
    {
      allPost {
        edges {
          node {
            __typename
            slug
            recordingDate
            ... on ContentfulPodcastPost {
              episodeNumber
            }
            games {
              ${['PodcastPost', 'VideoPost']
                .map(
                  (type) => `
              ... on contentful${type}GamesJsonNode {
                games {
                  id
                  name
                  aliases
                  deck
                  image {
                    icon_url
                    tiny_url
                    small_url
                  }
                }
              }
            `
                )
                .join('')}
            }
          }
        }
      }
      allContentfulPodcastPost {
        edges {
          node {
            recordingDate
          }
        }
      }
      allContentfulVideoPost {
        edges {
          node {
            recordingDate
          }
        }
      }
    }
  `);

  if (errors) {
    console.log(errors);
    throw errors;
  }

  const posts = data.allPost.edges;
  const gamesMap = getGamesMap(posts);

  // Create Home page
  createInfinitePages({
    createPage,
    posts,
    component: path.resolve(
      __dirname,
      '../src/templates/HomePage/HomePage.tsx'
    ),
  });

  // Create Saladcast page
  createInfinitePages({
    createPage,
    posts: data.allContentfulPodcastPost.edges,
    basePath: '/saladcast',
    component: path.resolve(
      __dirname,
      '../src/templates/PodcastCategoryPage/PodcastCategoryPage.tsx'
    ),
  });

  // Create Video thing page
  createInfinitePages({
    createPage,
    posts: data.allContentfulVideoPost.edges,
    basePath: '/video-thing',
    component: path.resolve(
      __dirname,
      '../src/templates/VideoCategoryPage/VideoCategoryPage.tsx'
    ),
  });

  // Create individual post pages
  posts.forEach(({ node: { __typename, slug, episodeNumber } }) => {
    if (__typename === 'ContentfulPodcastPost') {
      createPage({
        path: `/saladcast/${episodeNumber}-${slug}/`,
        component: path.resolve(
          __dirname,
          '../src/templates/PodcastPostPage/PodcastPostPage.tsx'
        ),
        context: { slug, ...globalContext },
      });
    } else if (__typename === 'ContentfulVideoPost') {
      createPage({
        path: `/video-thing/${slug}/`,
        component: path.resolve(
          __dirname,
          '../src/templates/VideoPostPage/VideoPostPage.tsx'
        ),
        context: { slug, ...globalContext },
      });
    }
  });

  // Create individual game pages
  gamesMap.forEach((game) => {
    createPage({
      path: `/game/${slugify(game.name)}`,
      component: path.resolve(
        __dirname,
        '../src/templates/GamePage/GamePage.tsx'
      ),
      context: { ...game, ...globalContext },
    });
  });

  createSearchData(gamesMap);
};

exports.onCreatePage = ({ page, actions: { createPage, deletePage } }) => {
  deletePage(page);
  createPage({
    ...page,
    context: {
      ...page.context,
      ...globalContext,
    },
  });
};

function createInfinitePages({ createPage, posts, basePath = '', component }) {
  const postCountByYear = countBy(
    posts.map(
      ({ node: { recordingDate } }) => DateTime.fromISO(recordingDate).year
    )
  );

  const years = Object.keys(postCountByYear).sort().reverse();

  if (!basePath) {
    globalContext.years = tail(years);
  }

  const postsPerPage = 5;
  let page = 0;
  let yearSkip = 0;

  years.forEach((year) => {
    const numPosts = postCountByYear[year];
    const numPages = Math.max(1, Math.floor(numPosts / postsPerPage));

    times(numPages, (pageInYear) => {
      const params = {
        component,
        context: {
          page,
          skip: yearSkip + pageInYear * postsPerPage,
          limit:
            pageInYear < numPages - 1
              ? postsPerPage
              : numPosts - (numPages - 1) * postsPerPage,
          ...globalContext,
        },
      };

      if (pageInYear === 0) {
        createPage({ path: `${basePath}/${year}`, ...params });
      }

      createPage({ path: `${basePath}/${page > 0 ? page : ''}`, ...params });
      page++;
    });

    yearSkip = yearSkip + numPosts;
  });
}

function getGamesMap(posts) {
  const gamesMap = new Map();
  const hotTopicsScores = {};

  posts.forEach(({ node: { slug, recordingDate, games } }) => {
    if (games) {
      games.games.forEach((game) => {
        const value = gamesMap.get(game.id) || game;
        value.slugs = value.slugs ? [...value.slugs, slug] : [slug];
        gamesMap.set(game.id, value);

        const monthsBack = 3;

        const date = DateTime.fromISO(recordingDate);
        const monthsBackAgo = DateTime.local().minus({ months: monthsBack });

        if (date > monthsBackAgo) {
          const score =
            1 +
            Interval.fromDateTimes(monthsBackAgo, date).length('month') /
              monthsBack;

          if (hotTopicsScores[game.id]) {
            hotTopicsScores[game.id].score =
              hotTopicsScores[game.id].score + score;
          } else {
            hotTopicsScores[game.id] = {
              id: game.id,
              name: game.name,
              image: { icon_url: game.image.icon_url },
              score,
            };
          }
        }
      });
    }
  });

  globalContext.hotTopics = take(
    Object.values(hotTopicsScores).sort((a, b) => b.score - a.score),
    12
  );

  return gamesMap;
}

function createSearchData(gamesMap) {
  const searchIndex = lunr(function () {
    this.use((builder) => {
      const splitOnNewlines = (token) =>
        token
          .toString()
          .split('\n')
          .map((str) => token.clone().update(() => str));

      lunr.Pipeline.registerFunction(splitOnNewlines, 'splitOnNewlines');
      builder.pipeline.before(lunr.stemmer, splitOnNewlines);
    });

    this.ref('id');
    this.field('name');
    this.field('aliases');

    gamesMap.forEach((game) => {
      this.add(game);
    });
  });

  const gameData = {};

  gamesMap.forEach(({ id, name, image: { tiny_url } }) => {
    gameData[id] = { name, tiny_url };
  });

  fs.writeFileSync(
    `public/search-data.json`,
    JSON.stringify({
      searchIndex,
      gameData,
    })
  );
}
