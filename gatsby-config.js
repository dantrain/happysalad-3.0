require('dotenv').config();

const siteUrl = 'https://happysalad.netlify.com/';

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
    siteUrl,
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
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
            output: '/rss.xml',
            title: 'Happysalad',
            language: 'en',
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
            serialize: ({ query: { allPost } }) =>
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
          },
          {
            output: '/saladcast.xml',
            title: 'The Saladcast',
            description: 'A public display of unhinged gaming waffle',
            language: 'en',
            copyright: `© Copyright 2010-${new Date().getUTCFullYear()} Happysalad`,
            managingEditor: 'Rob Kemp',
            webMaster: 'Dan Train',
            custom_namespaces: {
              itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
              googleplay: 'http://www.google.com/schemas/play-podcasts/1.0',
            },
            custom_elements: [
              {
                'itunes:subtitle': 'A public display of unhinged gaming waffle',
              },
              {
                'itunes:summary': `A gaming podcast featuring the views and opinions of 3 unhinged personalities. We put forward our impressions of the world of gaming, entertainment and anything else that's mildly interesting.`,
              },
              { 'itunes:author': 'Happysalad' },
              { 'itunes:type': 'episodic' },
              {
                'itunes:owner': [
                  { 'itunes:name': 'Happysalad' },
                  { 'itunes:email': 'webmaster@happysalad.net' },
                ],
              },
              {
                'itunes:image': {
                  _attr: {
                    href: `${siteUrl}images/podcast-image.png`,
                  },
                },
              },
              {
                'itunes:category': [
                  {
                    _attr: {
                      text: 'Leisure',
                    },
                  },
                  {
                    'itunes:category': {
                      _attr: {
                        text: 'Games',
                      },
                    },
                  },
                ],
              },
              {
                'itunes:category': {
                  _attr: {
                    text: 'Technology',
                  },
                },
              },
              { 'itunes:explicit': 'yes' },
            ],
            query: `
              {
                allContentfulPodcastPost(sort: {fields: [recordingDate], order: DESC}) {
                  edges {
                    node {
                      title
                      slug
                      episodeNumber
                      recordingDate
                      audioFile {
                        file {
                          url
                          details {
                            size
                          }
                        }
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
            serialize: ({ query: { allContentfulPodcastPost } }) =>
              allContentfulPodcastPost.edges.map(
                ({
                  node: {
                    title,
                    slug,
                    episodeNumber,
                    recordingDate,
                    audioFile: {
                      file: {
                        url,
                        details: { size },
                      },
                    },
                    body: {
                      childMarkdownRemark: { excerpt, html },
                    },
                  },
                }) => ({
                  title: `Saladcast ${episodeNumber} - ${title}`,
                  url: `${siteUrl}/saladcast/${episodeNumber}-${slug}/`,
                  description: excerpt,
                  date: recordingDate,
                  enclosure: {
                    url: `${siteUrl}assets${new URL(`https:${url}`).pathname}`,
                    size,
                    type: 'audio/mpeg',
                  },
                  custom_elements: [
                    { 'itunes:title': title },
                    { 'itunes:episode': episodeNumber },
                    { 'itunes:episodeType': 'full' },
                    { 'itunes:summary': excerpt },
                    { 'itunes:explicit': 'yes' },
                    { 'content:encoded': html },
                  ],
                })
              ),
          },
        ],
      },
    },
  ],
};
