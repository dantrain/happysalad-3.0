import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import flatten from 'lodash/flatten';
import { RootState, AppThunk } from '../../store';
import {
  InfiniteScrollState,
  PagePayload,
} from '../../features/infiniteScroll/createInfiniteScrollSlice';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import Tile from '../Tile/Tile';

type InfiniteTilesProps = {
  posts: {
    edges: { node: { slug?: string } }[];
    pageInfo: { currentPage: number; hasNextPage: boolean };
  };
  selector: (state: RootState) => InfiniteScrollState;
  initialPageLoad: ActionCreatorWithPayload<PagePayload>;
  fetchPage: () => AppThunk;
};

const InfiniteTiles: React.FC<InfiniteTilesProps> = ({
  posts,
  selector,
  initialPageLoad,
  fetchPage,
}) => {
  const state = useSelector<RootState, InfiniteScrollState>(selector);
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
