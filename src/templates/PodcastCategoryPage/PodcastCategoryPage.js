import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSlicePodcasts';
import Layout from '../../components/Layout';
import InfiniteTiles from '../../components/InfiniteTiles';

const PodcastCategoryPage = ({
  pageContext: { hotTopics },
  data: {
    allContentfulPodcastPost: posts,
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => {
  return (
    <Layout hotTopics={hotTopics}>
      <Helmet title={siteTitle} />
      <InfiniteTiles
        posts={posts}
        selector={state => state.infiniteScrollPodcasts}
        initialPageLoad={initialPageLoad}
        fetchPage={fetchPage}
      />
    </Layout>
  );
};

export default PodcastCategoryPage;

export const pageQuery = graphql`
  query PodcastCategoryQuery($limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPodcastPost(
      sort: { fields: [recordingDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          __typename
          slug
          ...PodcastPost
        }
      }
      pageInfo {
        currentPage
        hasNextPage
      }
    }
  }
`;
