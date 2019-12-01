import React from 'react';
import { graphql } from 'gatsby';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceVideos';
import PageTitle from '../../components/PageTitle';
import InfiniteTiles from '../../components/InfiniteTiles';

const VideoCategoryPage = ({ data: { allContentfulVideoPost: posts } }) => {
  return (
    <>
      <PageTitle title="Video Thing" />
      <InfiniteTiles
        posts={posts}
        selector={state => state.infiniteScrollVideos}
        initialPageLoad={initialPageLoad}
        fetchPage={fetchPage}
      />
    </>
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
