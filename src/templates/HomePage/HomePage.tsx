import React from 'react';
import { graphql } from 'gatsby';
import { HomeQuery } from '../../../types/graphql-types';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceHome';
import PageTitle from '../../components/PageTitle/PageTitle';
import InfiniteTiles from '../../components/InfiniteTiles/InfiniteTiles';

const HomePage: React.FC<{ data: HomeQuery }> = ({
  data: { allPost: posts },
}) => {
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
  query Home($limit: Int!, $skip: Int!) {
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
