import React from 'react';
import { graphql } from 'gatsby';
import { PodcastCategoryQuery } from '../../../types/graphql-types';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSlicePodcasts';
import PageTitle from '../../components/PageTitle/PageTitle';
import InfiniteTiles from '../../components/InfiniteTiles/InfiniteTiles';

const PodcastCategoryPage: React.FC<{
  data: PodcastCategoryQuery;
  pageContext: { page: number };
}> = ({ pageContext: { page }, data: { allContentfulPodcastPost: posts } }) => {
  return (
    <>
      <PageTitle title="The Saladcast" />
      <InfiniteTiles
        posts={posts}
        selector={(state) => state.infiniteScroll.podcasts}
        initialPage={page}
        initialPageLoad={initialPageLoad}
        fetchPage={fetchPage}
      />
    </>
  );
};

export default PodcastCategoryPage;

export const pageQuery = graphql`
  query PodcastCategory($limit: Int!, $skip: Int!) {
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
        hasNextPage
      }
    }
  }
`;
