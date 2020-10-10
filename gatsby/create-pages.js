const path = require('path');
const fs = require('fs');
const times = require('lodash/times');
const take = require('lodash/take');
const lunr = require('lunr');
const { DateTime, Interval } = require('luxon');
const slugify = require('@sindresorhus/slugify');

let hotTopics;

exports.createPages = ({ graphql, actions: { createPage } }) =>
  graphql(`
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
        totalCount
      }
      allContentfulPodcastPost {
        totalCount
      }
      allContentfulVideoPost {
        totalCount
      }
    }
  `).then(({ errors, data }) => {
    if (errors) {
      console.log(errors);
      throw errors;
    }

    const posts = data.allPost.edges;

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

    hotTopics = take(
      Object.values(hotTopicsScores).sort((a, b) => b.score - a.score),
      12
    );

    posts.forEach(({ node: { __typename, slug, episodeNumber } }) => {
      if (__typename === 'ContentfulPodcastPost') {
        createPage({
          path: `/saladcast/${episodeNumber}-${slug}/`,
          component: path.resolve(
            __dirname,
            '../src/templates/PodcastPostPage/PodcastPostPage.tsx'
          ),
          context: { slug, hotTopics },
        });
      } else if (__typename === 'ContentfulVideoPost') {
        createPage({
          path: `/video-thing/${slug}/`,
          component: path.resolve(
            __dirname,
            '../src/templates/VideoPostPage/VideoPostPage.tsx'
          ),
          context: { slug, hotTopics },
        });
      }
    });

    createInfinitePages({
      createPage,
      count: data.allPost.totalCount,
      component: path.resolve(
        __dirname,
        '../src/templates/HomePage/HomePage.tsx'
      ),
      context: { hotTopics },
    });

    createInfinitePages({
      createPage,
      path: '/saladcast',
      count: data.allContentfulPodcastPost.totalCount,
      component: path.resolve(
        __dirname,
        '../src/templates/PodcastCategoryPage/PodcastCategoryPage.tsx'
      ),
      context: { hotTopics },
    });

    createInfinitePages({
      createPage,
      path: '/video-thing',
      count: data.allContentfulVideoPost.totalCount,
      component: path.resolve(
        __dirname,
        '../src/templates/VideoCategoryPage/VideoCategoryPage.tsx'
      ),
      context: { hotTopics },
    });

    gamesMap.forEach((game) => {
      createPage({
        path: `/game/${slugify(game.name)}`,
        component: path.resolve(
          __dirname,
          '../src/templates/GamePage/GamePage.tsx'
        ),
        context: { ...game, hotTopics },
      });
    });

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
  });

exports.onCreatePage = ({ page, actions: { createPage, deletePage } }) => {
  deletePage(page);
  createPage({
    ...page,
    context: {
      ...page.context,
      hotTopics,
    },
  });
};

function createInfinitePages({
  createPage,
  count,
  path = '',
  component,
  context,
}) {
  const postsPerPage = 5;
  const numPages = Math.ceil(count / postsPerPage);

  times(numPages, (i) => {
    createPage({
      path: `${path}/${i > 0 ? i + 1 : ''}`,
      component,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        ...context,
      },
    });
  });
}
