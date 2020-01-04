import React from 'react';
import { graphql } from 'gatsby';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceHome';
import PageTitle from '../../components/PageTitle';
import InfiniteTiles from '../../components/InfiniteTiles';

const HomePage = ({ data: { allPost: posts } }) => {
  return (
    <>
      <PageTitle />
      <InfiniteTiles
        posts={posts}
        selector={state => state.infiniteScroll.home}
        initialPageLoad={initialPageLoad}
        fetchPage={fetchPage}
      />
    </>
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
