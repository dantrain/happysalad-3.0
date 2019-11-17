import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceVideos';
import Layout from '../../components/Layout';
import InfiniteTiles from '../../components/InfiniteTiles';

const VideoCategoryPage = ({
  pageContext: { hotTopics },
  data: {
    allContentfulVideoPost: posts,
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
        selector={state => state.infiniteScrollVideos}
        initialPageLoad={initialPageLoad}
        fetchPage={fetchPage}
      />
    </Layout>
  );
};

export default VideoCategoryPage;

export const pageQuery = graphql`
  query VideoCategoryQuery($limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulVideoPost(
      sort: { fields: [recordingDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          __typename
          slug
          ...VideoPost
        }
      }
      pageInfo {
        currentPage
        hasNextPage
      }
    }
  }
`;
