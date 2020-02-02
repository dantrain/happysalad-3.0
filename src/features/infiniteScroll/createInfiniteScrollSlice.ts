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
  currentPage: number;
  hasNextPage: boolean;
}

export interface PagePayload {
  edges: TileEdge[];
  pageInfo: PageInfo;
}

export type InfiniteScrollState = {
  loading: boolean;
  pages?: TileEdge[][];
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
  path = ''
): InfiniteScrollSlice => {
  const { actions, reducer } = createSlice({
    name: `infiniteScroll${upperFirst(name)}`,
    initialState: { loading: false } as InfiniteScrollState,
    reducers: {
      initialPageLoad: (
        state,
        { payload: { edges, pageInfo } }: PayloadAction<PagePayload>
      ) => {
        state.pages = [edges];
        state.pageInfo = pageInfo;
      },
      fetchPageStart: state => {
        state.loading = true;
      },
      fetchPageSuccess: (
        state,
        { payload: { edges, pageInfo } }: PayloadAction<PagePayload>
      ) => {
        state.pages[pageInfo.currentPage - 1] = edges;
        state.pageInfo = pageInfo;
        state.loading = false;
      },
      fetchPageFailure: state => {
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
          `/page-data${path}/${state.pageInfo.currentPage + 1}/page-data.json`
        );
        const data = await response.json();

        dispatch(actions.fetchPageSuccess(data.result.data[type]));
      } catch (err) {
        dispatch(actions.fetchPageFailure());
        console.error('Fetch page failure', err);
      }
    }
  };

  return { reducer, initialPageLoad: actions.initialPageLoad, fetchPage };
};
