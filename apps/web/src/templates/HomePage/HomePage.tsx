import React from 'react';
import { graphql } from 'gatsby';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceHome';
import InfiniteTiles from '../../components/InfiniteTiles/InfiniteTiles';
import SEO from '../../components/SEO';

const HomePage: React.FC<{
  data: Queries.HomeQuery;
  pageContext: { page: number };
}> = ({ pageContext: { page }, data: { allPost: posts } }) => {
  return (
    <>
      <SEO />
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
    allPost(sort: { recordingDate: DESC }, limit: $limit, skip: $skip) {
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
