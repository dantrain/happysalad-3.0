import React from 'react';
import { graphql } from 'gatsby';
import { PodcastCategoryQuery } from '../../../types/graphql-types';
import { RootState } from '../../store';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSlicePodcasts';
import PageTitle from '../../components/PageTitle/PageTitle';
import InfiniteTiles from '../../components/InfiniteTiles/InfiniteTiles';

const PodcastCategoryPage: React.FC<{ data: PodcastCategoryQuery }> = ({
  data: { allContentfulPodcastPost: posts },
}) => {
  return (
    <>
      <PageTitle title="The Saladcast" />
      <InfiniteTiles
        posts={posts}
        selector={(state: RootState) => state.infiniteScroll.podcasts}
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
        currentPage
        hasNextPage
      }
    }
  }
`;
