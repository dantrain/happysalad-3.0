import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store';

type GameData = {
  name: string;
  tiny_url: string;
};

interface SearchData {
  searchIndex: object | null;
  gameData: GameData[] | null;
}

type SearchDataState = {
  loading: boolean;
} & SearchData;

const { actions, reducer } = createSlice({
  name: 'searchData',
  initialState: {
    loading: false,
    gameData: null,
    searchIndex: null,
  } as SearchDataState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (
      state,
      { payload: { searchIndex, gameData } }: PayloadAction<SearchData>
    ) => {
      state.searchIndex = searchIndex;
      state.gameData = gameData;
      state.loading = false;
    },
    fetchDataFailure: (state) => {
      state.loading = false;
    },
  },
});

export const fetchData = (): AppThunk => async (dispatch, getState) => {
  const state = getState().searchData;

  if (!state.gameData && !state.searchIndex && !state.loading) {
    dispatch(actions.fetchDataStart());

    try {
      const response = await fetch('/search-data.json');
      const data: SearchData = await response.json();

      dispatch(actions.fetchDataSuccess(data));
    } catch (err) {
      dispatch(actions.fetchDataFailure());
      console.error('Fetch search data failure', err);
    }
  }
};

export default reducer;
