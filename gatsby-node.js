const path = require('path');
const times = require('lodash/times');

exports.createPages = ({ graphql, actions: { createPage } }) =>
  graphql(`
    {
      allContentfulVideoPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(({ errors, data: { allContentfulVideoPost: { edges: posts } } }) => {
    if (errors) {
      console.log(errors);
      throw errors;
    }

    posts.forEach(({ node: { slug } }) => {
      createPage({
        path: `/${slug}/`,
        component: path.resolve('./src/templates/VideoPost/VideoPost.js'),
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
  });
