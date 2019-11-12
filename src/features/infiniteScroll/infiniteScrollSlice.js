import { createSlice } from 'redux-starter-kit';

const { actions, reducer } = createSlice({
  name: 'infiniteScroll',
  initialState: { loading: false },
  reducers: {
    initialPageLoad: (state, { payload: { firstPage, firstPageInfo } }) => {
      state.pages = [firstPage];
      state.pageInfo = firstPageInfo;
    },
    fetchPageStart: state => {
      state.loading = true;
    },
    fetchPageSuccess: (state, { payload: { pageInfo, edges } }) => {
      state.pages[pageInfo.currentPage - 1] = edges;
      state.pageInfo = pageInfo;
      state.loading = false;
    },
    fetchPageFailure: state => {
      state.loading = false;
    },
  },
});

export const { initialPageLoad } = actions;

export const fetchPage = () => async (dispatch, getState) => {
  const state = getState().infiniteScroll;

  if (state.pageInfo) {
    dispatch(actions.fetchPageStart());

    try {
      const response = await fetch(
        `/page-data/${state.pageInfo.currentPage + 1}/page-data.json`
      );
      const data = await response.json();

      dispatch(actions.fetchPageSuccess(data.result.data.allPost));
    } catch (err) {
      dispatch(actions.fetchPageFailure());
      console.error('Fetch page failure', err);
    }
  }
};

export default reducer;
