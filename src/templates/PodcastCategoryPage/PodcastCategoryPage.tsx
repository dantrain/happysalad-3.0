import React from 'react';
import { graphql, HeadFC } from 'gatsby';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSlicePodcasts';
import InfiniteTiles from '../../components/InfiniteTiles/InfiniteTiles';
import SEO from '../../components/SEO';

const PodcastCategoryPage: React.FC<{
  data: Queries.PodcastCategoryQuery;
  pageContext: { page: number };
}> = ({ pageContext: { page }, data: { allContentfulPodcastPost: posts } }) => {
  return (
    <>
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

export const Head: HeadFC = () => <SEO title="The Saladcast" />;

export const pageQuery = graphql`
  query PodcastCategory($limit: Int!, $skip: Int!) {
    allContentfulPodcastPost(
      sort: { recordingDate: DESC }
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
