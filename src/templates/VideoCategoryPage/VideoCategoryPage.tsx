import React from 'react';
import { graphql } from 'gatsby';
import { VideoCategoryQuery } from '../../../types/graphql-types';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSliceVideos';
import InfiniteTiles from '../../components/InfiniteTiles/InfiniteTiles';
import { Helmet } from 'react-helmet';

const VideoCategoryPage: React.FC<{
  data: VideoCategoryQuery;
  pageContext: { page: number };
}> = ({ pageContext: { page }, data: { allContentfulVideoPost: posts } }) => {
  return (
    <>
      <Helmet>
        <title>Video Thing</title>
        <meta
          name="description"
          content="Video Thing from Happysalad on YouTube"
        />
      </Helmet>
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
        hasNextPage
      }
    }
  }
`;
