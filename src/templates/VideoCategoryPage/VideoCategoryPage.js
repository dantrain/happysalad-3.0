import React from 'react';
import { graphql } from 'gatsby';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceVideos';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import InfiniteTiles from '../../components/InfiniteTiles';

const VideoCategoryPage = ({
  pageContext: { hotTopics },
  data: { allContentfulVideoPost: posts },
}) => {
  return (
    <Layout hotTopics={hotTopics}>
      <PageTitle title="Video Thing" />
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
