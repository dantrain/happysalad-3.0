import React from 'react';
import { graphql } from 'gatsby';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceVideos';
import InfiniteTiles from '../../components/InfiniteTiles/InfiniteTiles';
import SEO from '../../components/SEO';

const VideoCategoryPage: React.FC<{
  data: Queries.VideoCategoryQuery;
  pageContext: { page: number };
}> = ({ pageContext: { page }, data: { allContentfulVideoPost: posts } }) => {
  return (
    <>
      <SEO title="Video Thing" />
      <InfiniteTiles
        posts={posts}
        selector={(state) => state.infiniteScroll.videos}
        initialPage={page}
        initialPageLoad={initialPageLoad}
        fetchPage={fetchPage}
      />
    </>
  );
};

export default VideoCategoryPage;

export const pageQuery = graphql`
  query VideoCategory($limit: Int!, $skip: Int!) {
    allContentfulVideoPost(
      sort: { recordingDate: DESC }
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
        hasNextPage
      }
    }
  }
`;
