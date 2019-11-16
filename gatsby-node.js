const path = require('path');
const fs = require('fs');
const times = require('lodash/times');
const take = require('lodash/take');
const lunr = require('lunr');
const { DateTime } = require('luxon');

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
                    thumb_url
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
    }
  `).then(({ errors, data: { allPost: { edges: posts } } }) => {
    if (errors) {
      console.log(errors);
      throw errors;
    }

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
              hotTopicsCounts[game.id].count =
                hotTopicsCounts[game.id].count + 1;
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

    posts.forEach(({ node: { __typename, slug } }) => {
      const type = __typename.replace('Contentful', '');
      createPage({
        path: `/${slug}/`,
        component: path.resolve(`./src/templates/${type}Page/${type}Page.js`),
        context: { slug, hotTopics },
      });
    });

    const postsPerPage = 5;
    const numPages = Math.ceil(posts.length / postsPerPage);

    times(numPages, i => {
      createPage({
        path: `/${i > 0 ? i + 1 : ''}`,
        component: path.resolve('./src/templates/Home/Home.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          hotTopics,
        },
      });
    });

    gamesMap.forEach(game => {
      createPage({
        path: `/game/${game.id}`,
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

    gameData = {};

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
