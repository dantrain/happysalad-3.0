import React from 'react';
import { graphql } from 'gatsby';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceHome';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import InfiniteTiles from '../../components/InfiniteTiles';

const HomePage = ({ pageContext: { hotTopics }, data: { allPost: posts } }) => {
  return (
    <Layout hotTopics={hotTopics}>
      <PageTitle />
      <InfiniteTiles
        posts={posts}
        selector={state => state.infiniteScrollHome}
        initialPageLoad={initialPageLoad}
        fetchPage={fetchPage}
      />
    </Layout>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query HomeQuery($limit: Int!, $skip: Int!) {
    allPost(
      sort: { fields: [recordingDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          __typename
          slug
          ...PodcastPost
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
