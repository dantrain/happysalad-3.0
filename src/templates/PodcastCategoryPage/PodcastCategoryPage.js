import React from 'react';
import { graphql } from 'gatsby';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSlicePodcasts';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import InfiniteTiles from '../../components/InfiniteTiles';

const PodcastCategoryPage = ({
  pageContext: { hotTopics },
  data: { allContentfulPodcastPost: posts },
}) => {
  return (
    <Layout hotTopics={hotTopics}>
      <PageTitle title="The Saladcast" />
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
