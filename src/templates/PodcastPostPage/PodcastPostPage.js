import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import PodcastPost from '../../components/PodcastPost';

const PodcastPostPage = ({
  pageContext: { hotTopics },
  data: {
    contentfulPodcastPost,
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => (
  <Layout hotTopics={hotTopics}>
    <Helmet
      title={`SaladCast ${contentfulPodcastPost.episodeNumber} - ${contentfulPodcastPost.title} · ${siteTitle}`}
    />
    <PodcastPost {...contentfulPodcastPost} />
  </Layout>
);

export default PodcastPostPage;

export const pageQuery = graphql`
  query PodcastPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPodcastPost(slug: { eq: $slug }) {
      ...PodcastPost
    }
  }
`;
