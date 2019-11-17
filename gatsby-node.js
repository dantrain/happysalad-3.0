const path = require('path');
const fs = require('fs');
const times = require('lodash/times');
const take = require('lodash/take');
const lunr = require('lunr');
const { DateTime } = require('luxon');
const slugify = require('@sindresorhus/slugify');

const postTypes = ['PodcastPost', 'VideoPost'];

exports.createSchemaCustomization = ({ actions: { createTypes } }) =>
  createTypes(`
      union Games = ${postTypes
        .map(type => `contentful${type}GamesJsonNode`)
        .join(' | ')}

      interface Post @nodeInterface {
        id: ID!
        slug: String
        recordingDate: Date
        games: Games 
      }

      ${postTypes
        .map(
          type => `
        type Contentful${type} implements Node & Post @infer {
          id: ID!
        }
      `
        )
        .join('')}
  `);

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
              ${postTypes
                .map(
                  type => `
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
    const hotTopicsCounts = {};

    posts.forEach(({ node: { slug, recordingDate, games } }) => {
      if (games) {
        games.games.forEach(game => {
          const value = gamesMap.get(game.id) || game;
          value.slugs = value.slugs ? [...value.slugs, slug] : [slug];
          gamesMap.set(game.id, value);

          if (
            DateTime.fromISO(recordingDate) >
            DateTime.local().minus({ months: 3 })
          ) {
            if (hotTopicsCounts[game.id]) {
              hotTopicsCounts[game.id].count++;
            } else {
              hotTopicsCounts[game.id] = {
                id: game.id,
                name: game.name,
                image: { icon_url: game.image.icon_url },
                count: 1,
              };
            }
          }
        });
      }
    });

    const hotTopics = take(
      Object.values(hotTopicsCounts).sort((a, b) => b.count - a.count),
      12
    );

    posts.forEach(({ node: { __typename, slug, episodeNumber } }) => {
      if (__typename === 'ContentfulPodcastPost') {
        createPage({
          path: `/saladcast/${episodeNumber}-${slug}/`,
          component: path.resolve(
            './src/templates/PodcastPostPage/PodcastPostPage.js'
          ),
          context: { slug, hotTopics },
        });
      } else if (__typename === 'ContentfulVideoPost') {
        createPage({
          path: `/video-thing/${slug}/`,
          component: path.resolve(
            './src/templates/VideoPostPage/VideoPostPage.js'
          ),
          context: { slug, hotTopics },
        });
      }
    });

    createInfinitePages({
      createPage,
      count: data.allPost.totalCount,
      component: path.resolve('./src/templates/HomePage/HomePage.js'),
      context: { hotTopics },
    });

    createInfinitePages({
      createPage,
      path: '/saladcast',
      count: data.allContentfulPodcastPost.totalCount,
      component: path.resolve(
        './src/templates/PodcastCategoryPage/PodcastCategoryPage.js'
      ),
      context: { hotTopics },
    });

    createInfinitePages({
      createPage,
      path: '/video-thing',
      count: data.allContentfulVideoPost.totalCount,
      component: path.resolve(
        './src/templates/VideoCategoryPage/VideoCategoryPage.js'
      ),
      context: { hotTopics },
    });

    gamesMap.forEach(game => {
      createPage({
        path: `/game/${slugify(game.name)}`,
        component: path.resolve('./src/templates/GamePage/GamePage.js'),
        context: { ...game, hotTopics },
      });
    });

    const searchIndex = lunr(function() {
      this.use(builder => {
        const splitOnNewlines = token =>
          token
            .toString()
            .split('\n')
            .map(str => token.clone().update(() => str));

        lunr.Pipeline.registerFunction(splitOnNewlines, 'splitOnNewlines');
        builder.pipeline.before(lunr.stemmer, splitOnNewlines);
      });

      this.ref('id');
      this.field('name');
      this.field('aliases');

      gamesMap.forEach(game => {
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

function createInfinitePages({
  createPage,
  count,
  path = '',
  component,
  context,
}) {
  const postsPerPage = 5;
  const numPages = Math.ceil(count / postsPerPage);

  times(numPages, i => {
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
