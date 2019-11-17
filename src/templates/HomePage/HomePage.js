import React, { useEffect, useCallback } from 'react';
import { graphql } from 'gatsby';
import flatten from 'lodash/flatten';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import {
  initialPageLoad,
  fetchPage,
} from '../../features/infiniteScroll/infiniteScrollSlice';
import Layout from '../../components/Layout';
import InfiniteScroll from '../../components/InfiniteScroll';
import Tile from '../../components/Tile';

import s from './home-page.module.css';

const HomePage = ({
  pageContext: { hotTopics },
  data: {
    allPost: { edges: firstPage, pageInfo: firstPageInfo },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => {
  const state = useSelector(state => state.infiniteScroll);
  const { pages = [firstPage], pageInfo = firstPageInfo, loading } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.pageInfo) {
      dispatch(initialPageLoad({ firstPage, firstPageInfo }));
    }
  }, []);

  const loadNextPage = useCallback(() => dispatch(fetchPage()), [dispatch]);

  return (
    <Layout hotTopics={hotTopics}>
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
    </Layout>
  );
};

export default HomePage;

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