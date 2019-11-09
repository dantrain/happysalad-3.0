import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { useGlobalState } from '../../components/GlobalState';
import Page from '../../components/Page';
import InfiniteScroll from '../../components/InfiniteScroll';
import VideoPostTile from '../../components/VideoPostTile';

import s from './home.module.css';

const Home = ({
  data: {
    allContentfulVideoPost: { edges: initialPosts, pageInfo: initialPageInfo },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => {
  const {
    state: { posts, pageInfo, loading },
    loadNextPage,
  } = useGlobalState({
    posts: initialPosts,
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
          {posts.map(({ node }) => {
            return (
              <li key={node.slug}>
                <VideoPostTile {...node} />
              </li>
            );
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
    allContentfulVideoPost(
      sort: { fields: [recordingDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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
