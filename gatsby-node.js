const path = require('path');
const times = require('lodash/times');

// const postTypes = ['ContentfulPodcastPost', 'ContentfulVideoPost'];

// exports.createSchemaCustomization = ({ actions: { createTypes }, schema }) =>
//   createTypes([
//     schema.buildUnionType({
//       name: 'Post',
//       types: postTypes,
//       resolveType: node => node.internal.type,
//     }),
//   ]);

exports.createSchemaCustomization = ({ actions: { createTypes } }) =>
  createTypes(`
      interface Post @nodeInterface {
        id: ID!
        slug: String
        recordingDate: Date
      }
      type ContentfulPodcastPost implements Node & Post @infer {
        id: ID!
      }
      type ContentfulVideoPost implements Node & Post @infer {
        id: ID!
      }
  `);

// exports.createResolvers = ({ createResolvers }) =>
//   createResolvers({
//     Query: {
//       allPost: {
//         type: `[Post!]!`,
//         resolve(source, args, context, info) {
//           return postTypes
//             .reduce(
//               (posts, type) => [
//                 ...posts,
//                 ...context.nodeModel.getAllNodes({ type }),
//               ],
//               []
//             )
//             .sort((p1, p2) =>
//               new Date(p1.recordingDate) > new Date(p2.recordingDate) ? -1 : 1
//             );
//         },
//       },
//     },
//   });

exports.createPages = ({ graphql, actions: { createPage } }) =>
  graphql(`
    {
      allPost(sort: { fields: [recordingDate], order: DESC }) {
        edges {
          node {
            __typename
            slug
          }
        }
      }
    }
  `).then(({ errors, data: { allPost: { edges: posts } } }) => {
    if (errors) {
      console.log(errors);
      throw errors;
    }

    posts.forEach(({ node: { __typename, slug } }) => {
      const type = __typename.replace('Contentful', '');
      createPage({
        path: `/${slug}/`,
        component: path.resolve(`./src/templates/${type}/${type}.js`),
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
