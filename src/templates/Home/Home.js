import React from 'react';
import { graphql } from 'gatsby';
import flatten from 'lodash/flatten';
import Helmet from 'react-helmet';
import { useGlobalState } from '../../components/GlobalState';
import Page from '../../components/Page';
import InfiniteScroll from '../../components/InfiniteScroll';
import PodcastPostTile from '../../components/PodcastPostTile';
import VideoPostTile from '../../components/VideoPostTile';

import s from './home.module.css';

const Home = ({
  data: {
    allPost: { edges: initialPosts, pageInfo: initialPageInfo },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => {
  const {
    state: { pages, pageInfo, loading },
    loadNextPage,
  } = useGlobalState({
    pages: [initialPosts],
    pageInfo: initialPageInfo,
    loading: false,
  });

  return (
    <Page>
      <Helmet title={siteTitle} />
      <InfiniteScroll
        isLoading={loading}
        hasMore={pageInfo.hasNextPage}
        onLoadMore={loadNextPage}
      >
        <ul className={s.postList}>
          {flatten(pages).map(({ node }) => {
            switch (node.__typename) {
              case 'ContentfulPodcastPost':
                return (
                  <li key={node.slug}>
                    <PodcastPostTile {...node} />
                  </li>
                );
              case 'ContentfulVideoPost':
                return (
                  <li key={node.slug}>
                    <VideoPostTile {...node} />
                  </li>
                );
              default:
                return null;
            }
          })}
        </ul>
      </InfiniteScroll>
    </Page>
  );
};

export default Home;

export const pageQuery = graphql`
  query HomeQuery($limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allPost(
      sort: { fields: [recordingDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          __typename
          slug
          ...PodcastPostTile
          ...VideoPostTile
        }
      }
      pageInfo {
        currentPage
        hasNextPage
      }
    }
  }
`;
