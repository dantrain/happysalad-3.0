import {
  createSlice,
  PayloadAction,
  AnyAction,
  Reducer,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import upperFirst from 'lodash/upperFirst';
import { TileEdge } from '../../components/Tile/Tile';
import { AppThunk } from '../../store';

type InfiniteScrollSliceName = 'home' | 'podcasts' | 'videos';

interface PageInfo {
  hasNextPage: boolean;
}

export interface PagePayload {
  edges: readonly TileEdge[];
  pageInfo: PageInfo;
  pageContext: {
    page: number;
  };
}

export type InfiniteScrollState = {
  loading: boolean;
  startPage?: number;
  currentPage: number;
  pages?: (readonly TileEdge[])[];
  pageInfo?: PageInfo;
};

type InfiniteScrollSlice = {
  reducer: Reducer<InfiniteScrollState, AnyAction>;
  initialPageLoad: ActionCreatorWithPayload<PagePayload>;
  fetchPage: () => AppThunk;
};

export default (
  name: InfiniteScrollSliceName,
  type: string,
  path = '',
): InfiniteScrollSlice => {
  const { actions, reducer } = createSlice({
    name: `infiniteScroll${upperFirst(name)}`,
    initialState: {
      loading: false,
      currentPage: 0,
    } as InfiniteScrollState,
    reducers: {
      initialPageLoad: (
        state,
        {
          payload: {
            edges,
            pageInfo,
            pageContext: { page },
          },
        }: PayloadAction<PagePayload>,
      ) => {
        state.pages = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state.pages as any[])[page] = edges;
        state.pageInfo = pageInfo;
        state.startPage = page;
        state.currentPage = page;
      },
      fetchPageStart: (state) => {
        state.loading = true;
      },
      fetchPageSuccess: (
        state,
        {
          payload: {
            edges,
            pageInfo,
            pageContext: { page },
          },
        }: PayloadAction<PagePayload>,
      ) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state.pages as any[])[page] = edges;
        state.pageInfo = pageInfo;
        state.currentPage = page;
        state.loading = false;
      },
      fetchPageFailure: (state) => {
        state.loading = false;
      },
    },
  });

  const fetchPage = (): AppThunk => async (dispatch, getState) => {
    const state = getState().infiniteScroll[name];

    if (state.pageInfo) {
      dispatch(actions.fetchPageStart());

      try {
        const response = await fetch(
          `/page-data${path}/${state.currentPage + 1}/page-data.json`,
        );
        const data = await response.json();

        dispatch(
          actions.fetchPageSuccess({
            ...data.result.data[type],
            pageContext: data.result.pageContext,
          }),
        );
      } catch (err) {
        dispatch(actions.fetchPageFailure());
        console.error('Fetch page failure', err);
      }
    }
  };

  return { reducer, initialPageLoad: actions.initialPageLoad, fetchPage };
};
