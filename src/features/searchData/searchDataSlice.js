import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'searchData',
  initialState: { loading: false, gameData: null, searchIndex: null },
  reducers: {
    fetchDataStart: state => {
      state.loading = true;
    },
    fetchDataSuccess: (state, { payload: { searchIndex, gameData } }) => {
      state.searchIndex = searchIndex;
      state.gameData = gameData;
      state.loading = false;
    },
    fetchDataFailure: state => {
      state.loading = false;
    },
  },
});

export const fetchData = () => async (dispatch, getState) => {
  const state = getState().searchData;

  if (!state.gameData && !state.searchIndex && !state.loading) {
    dispatch(actions.fetchDataStart());

    try {
      const response = await fetch('/search-data.json');
      const data = await response.json();

      dispatch(actions.fetchDataSuccess(data));
    } catch (err) {
      dispatch(actions.fetchDataFailure());
      console.error('Fetch search data failure', err);
    }
  }
};

export default reducer;
