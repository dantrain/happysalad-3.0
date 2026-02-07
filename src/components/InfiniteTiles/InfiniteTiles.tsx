import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import flatten from 'lodash/flatten';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { RootState, AppDispatch, AppThunk } from '../../store';
import {
  InfiniteScrollState,
  PagePayload,
} from '../../features/infiniteScroll/createInfiniteScrollSlice';
import Tile, { TileEdge } from '../Tile/Tile';
import heightCache from '../../utils/heightCache';

type InfiniteTilesProps = {
  posts: {
    readonly edges: readonly TileEdge[];
    readonly pageInfo: { readonly hasNextPage: boolean };
  };
  selector: (state: RootState) => InfiniteScrollState;
  initialPage: number;
  initialPageLoad: ActionCreatorWithPayload<PagePayload>;
  fetchPage: () => AppThunk;
};

const InfiniteTiles: React.FC<InfiniteTilesProps> = ({
  posts,
  selector,
  initialPage,
  initialPageLoad,
  fetchPage,
}) => {
  const state = useSelector<RootState, InfiniteScrollState>(selector);
  const {
    startPage,
    pages = [posts.edges],
    pageInfo = posts.pageInfo,
    loading,
  } = state;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (initialPage !== startPage) {
      dispatch(
        initialPageLoad({
          edges: posts.edges,
          pageInfo: posts.pageInfo,
          pageContext: { page: initialPage },
        }),
      );
    }
  }, []);

  const items = useMemo(() => flatten(pages).filter(Boolean), [pages]);
  const loadNextPage = useCallback(() => dispatch(fetchPage()), [dispatch]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return (
      <ul>
        {items.map(({ node }) => (
          <li key={node.slug}>
            <Tile node={node} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <VirtualizedList
      items={items}
      loading={loading}
      hasMore={pageInfo.hasNextPage}
      onLoadMore={loadNextPage}
    />
  );
};

type VirtualizedListProps = {
  items: TileEdge[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
};

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  loading,
  hasMore,
  onLoadMore,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollMarginRef = useRef(0);

  useLayoutEffect(() => {
    scrollMarginRef.current = listRef.current?.offsetTop ?? 0;
  }, []);

  const itemsRef = useRef(items);
  itemsRef.current = items;

  const virtualizer = useWindowVirtualizer({
    count: items.length,
    estimateSize: (index) => {
      const slug = itemsRef.current[index]?.node.slug;
      if (slug && heightCache.has(slug)) return heightCache.get(slug)!;
      return itemsRef.current[index]?.node.__typename === 'ContentfulVideoPost'
        ? 550
        : 350;
    },
    overscan: 5,
    scrollMargin: scrollMarginRef.current,
    measureElement: (el) => {
      const height = el.getBoundingClientRect().height;
      const index = Number((el as HTMLElement).dataset.index);
      const slug = itemsRef.current[index]?.node.slug;
      if (slug) heightCache.set(slug, height);
      return height;
    },
  });

  const virtualItems = virtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!lastItem) return;
    if (lastItem.index >= items.length - 3 && hasMore && !loading) {
      onLoadMore();
    }
  }, [lastItem?.index, items.length, hasMore, loading, onLoadMore]);

  return (
    <div ref={listRef}>
      <ul
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualItem) => {
          const edge = items[virtualItem.index];
          return (
            <li
              key={edge.node.slug}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              <Tile node={edge.node} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InfiniteTiles;
