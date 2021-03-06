import React from 'react';
import { graphql } from 'gatsby';
import { HomeQuery } from '../../../types/graphql-types';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceHome';
import InfiniteTiles from '../../components/InfiniteTiles/InfiniteTiles';

const HomePage: React.FC<{
  data: HomeQuery;
  pageContext: { page: number };
}> = ({ pageContext: { page }, data: { allPost: posts } }) => {
  return (
    <>
      <InfiniteTiles
        posts={posts}
        selector={(state) => state.infiniteScroll.home}
        initialPage={page}
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
        hasNextPage
      }
    }
  }
`;
