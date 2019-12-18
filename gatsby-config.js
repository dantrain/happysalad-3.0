require('dotenv').config();

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  );
}

module.exports = {
  siteMetadata: {
    title: 'Happysalad',
    siteUrl: 'https://happysalad.netlify.com/',
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: {
                site: {
                  siteMetadata: { siteUrl },
                },
                allPost,
              },
            }) =>
              allPost.edges.map(
                ({
                  node: {
                    __typename,
                    slug,
                    title,
                    recordingDate,
                    episodeNumber,
                    body: {
                      childMarkdownRemark: { excerpt, html },
                    },
                  },
                }) => {
                  let url;

                  if (__typename === 'ContentfulPodcastPost') {
                    url = `${siteUrl}/saladcast/${episodeNumber}-${slug}/`;
                  } else if (__typename === 'ContentfulVideoPost') {
                    url = `${siteUrl}/video-thing/${slug}/`;
                  }

                  return {
                    title,
                    url,
                    description: excerpt,
                    date: recordingDate,
                    custom_elements: [{ 'content:encoded': html }],
                  };
                }
              ),
            query: `
              {
                allPost(sort: {fields: [recordingDate], order: DESC}, limit: 20) {
                  edges {
                    node {
                      __typename
                      slug
                      title
                      recordingDate
                      ... on ContentfulPodcastPost {
                        episodeNumber
                      }
                      body {
                        childMarkdownRemark {
                          excerpt
                          html
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Happysalad',
          },
        ],
      },
    },
  ],
};
