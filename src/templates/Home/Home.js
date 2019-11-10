import React from 'react';
import { graphql } from 'gatsby';
import flatten from 'lodash/flatten';
import Helmet from 'react-helmet';
import { useGlobalState } from '../../components/GlobalState';
import Page from '../../components/Page';
import InfiniteScroll from '../../components/InfiniteScroll';
import Tile from '../../components/Tile';

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
          {flatten(pages).map(({ node }) => (
            <li key={node.slug}>
              <Tile node={node} />
            </li>
          ))}
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
          ...PodcastPost
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
