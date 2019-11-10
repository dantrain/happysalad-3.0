import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Page from '../../components/Page';
import PodcastPost from '../../components/PodcastPost';

const PodcastPostPage = ({
  data: {
    contentfulPodcastPost,
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => (
  <Page>
    <Helmet
      title={`SaladCast ${contentfulPodcastPost.episodeNumber} - ${contentfulPodcastPost.title} · ${siteTitle}`}
    />
    <PodcastPost {...contentfulPodcastPost} />
  </Page>
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
