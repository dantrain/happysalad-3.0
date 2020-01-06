import React from 'react';
import { graphql } from 'gatsby';
import { RootState } from '../../store';
import { VideoCategoryQuery } from '../../../types/graphql-types';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceVideos';
import PageTitle from '../../components/PageTitle/PageTitle';
import InfiniteTiles from '../../components/InfiniteTiles/InfiniteTiles';

const VideoCategoryPage: React.FC<{ data: VideoCategoryQuery }> = ({
  data: { allContentfulVideoPost: posts },
}) => {
  return (
    <>
      <PageTitle title="Video Thing" />
      <InfiniteTiles
        posts={posts}
        selector={(state: RootState) => state.infiniteScroll.videos}
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
