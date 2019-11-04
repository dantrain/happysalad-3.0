const path = require('path');
const fs = require('fs');
const times = require('lodash/times');

const createPaginationJSON = (pathSuffix, pagePosts) => {
  const dir = 'public/paginationJson/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const filePath = dir + 'index' + pathSuffix + '.json';
  const dataToSave = JSON.stringify(pagePosts);
  fs.writeFile(filePath, dataToSave, function(err) {
    if (err) {
      return console.log(err);
    }
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allContentfulPodcastPost {
            edges {
              node {
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allContentfulPodcastPost.edges;

        posts.forEach(post => {
          createPage({
            path: `/${post.node.slug}/`,
            component: path.resolve(
              './src/templates/PodcastPost/PodcastPost.js'
            ),
            context: {
              slug: post.node.slug,
            },
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
      })
    );
  });
};
