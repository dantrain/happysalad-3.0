const postTypes = ['PodcastPost', 'VideoPost'];

exports.createSchemaCustomization = ({ actions: { createTypes } }) =>
  createTypes(`
      union Games = ${postTypes
        .map((type) => `contentful${type}GamesJsonNode`)
        .join(' | ')}

      interface Body {
        childMarkdownRemark: MarkdownRemark
      }

      ${postTypes.map(
        (type) => `
        type contentful${type}BodyTextNode implements Node & Body @infer {
          childMarkdown: MarkdownRemark
        }
      `
      )}

      interface Post @nodeInterface {
        id: ID!
        slug: String
        title: String
        recordingDate: Date
        games: Games 
        body: Body
      }

      ${postTypes
        .map(
          (type) => `
        type Contentful${type} implements Node & Post @infer {
          id: ID!
        }
      `
        )
        .join('')}
  `);
