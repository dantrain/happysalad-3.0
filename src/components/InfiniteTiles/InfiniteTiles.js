import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import flatten from 'lodash/flatten';
import InfiniteScroll from '../InfiniteScroll';
import Tile from '../Tile';

const InfiniteTiles = ({ posts, selector, initialPageLoad, fetchPage }) => {
  const state = useSelector(selector);
  const { pages = [posts.edges], pageInfo = posts.pageInfo, loading } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.pageInfo) {
      dispatch(
        initialPageLoad({
          edges: posts.edges,
          pageInfo: posts.pageInfo,
        })
      );
    }
  }, []);

  const loadNextPage = useCallback(() => dispatch(fetchPage()), [dispatch]);

  return (
    <InfiniteScroll
      isLoading={loading}
      hasMore={pageInfo.hasNextPage}
      onLoadMore={loadNextPage}
    >
      <ul>
        {flatten(pages).map(({ node }) => (
          <li key={node.slug}>
            <Tile node={node} />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default InfiniteTiles;
