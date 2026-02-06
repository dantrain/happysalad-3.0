module.exports = {
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
      'itunes:new-feed-url': `${process.env.SITE_URL}/saladcast.xml`,
    },
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
          href: `${process.env.SITE_URL}/images/podcast-image.png`,
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
      allContentfulPodcastPost(sort: {recordingDate: DESC}) {
        edges {
          node {
            title
            slug
            rssGuid
            episodeNumber
            recordingDate
            audioFileUrl
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
          rssGuid,
          episodeNumber,
          recordingDate,
          audioFileUrl,
          body: {
            childMarkdownRemark: { excerpt, html },
          },
        },
      }) => ({
        title: `Saladcast ${episodeNumber} - ${title}`,
        url: `${process.env.SITE_URL}/saladcast/${episodeNumber}-${slug}/`,
        guid: rssGuid || slug,
        description: excerpt,
        date: recordingDate,
        enclosure: {
          url: `${process.env.SITE_URL}/podcasts${
            new URL(audioFileUrl).pathname
          }`,
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
};
