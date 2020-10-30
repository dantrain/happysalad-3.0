module.exports = {
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
          title: contentfulTitle,
          recordingDate,
          episodeNumber,
          body: {
            childMarkdownRemark: { excerpt, html },
          },
        },
      }) => {
        let url;
        let title;

        if (__typename === 'ContentfulPodcastPost') {
          url = `${process.env.SITE_URL}/saladcast/${episodeNumber}-${slug}/`;
          title = `Saladcast ${episodeNumber} - ${contentfulTitle}`;
        } else if (__typename === 'ContentfulVideoPost') {
          url = `${process.env.SITE_URL}/video-thing/${slug}/`;
          title = `Gameplay - ${contentfulTitle}`;
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
};
