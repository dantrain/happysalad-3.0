const path = require('path');
const fs = require('fs');
const times = require('lodash/times');
const lunr = require('lunr');

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
                    thumb_url
                    tiny_url
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

    posts.forEach(({ node: { __typename, slug, games } }) => {
      if (games) {
        games.games.forEach(game => {
          const value = gamesMap.get(game.id) || game;
          value.slugs = value.slugs ? [...value.slugs, slug] : [slug];
          gamesMap.set(game.id, value);
        });
      }

      const type = __typename.replace('Contentful', '');
      createPage({
        path: `/${slug}/`,
        component: path.resolve(`./src/templates/${type}Page/${type}Page.js`),
        context: { slug },
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
        },
      });
    });

    gamesMap.forEach(game => {
      createPage({
        path: `/game/${game.id}`,
        component: path.resolve('./src/templates/GamePage/GamePage.js'),
        context: game,
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
