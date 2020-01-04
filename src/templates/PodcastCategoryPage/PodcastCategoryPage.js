import React from 'react';
import { graphql } from 'gatsby';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSlicePodcasts';
import PageTitle from '../../components/PageTitle';
import InfiniteTiles from '../../components/InfiniteTiles';

const PodcastCategoryPage = ({ data: { allContentfulPodcastPost: posts } }) => {
  return (
    <>
      <PageTitle title="The Saladcast" />
      <InfiniteTiles
        posts={posts}
        selector={state => state.infiniteScroll.podcasts}
        initialPageLoad={initialPageLoad}
        fetchPage={fetchPage}
      />
    </>
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
