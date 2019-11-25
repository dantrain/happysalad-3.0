import { createSlice } from '@reduxjs/toolkit';

export default ({ name, type, path = '' }) => {
  const { actions, reducer } = createSlice({
    name: `infiniteScroll${name}`,
    initialState: { loading: false },
    reducers: {
      initialPageLoad: (state, { payload: { edges, pageInfo } }) => {
        state.pages = [edges];
        state.pageInfo = pageInfo;
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

  const fetchPage = () => async (dispatch, getState) => {
    const state = getState()[`infiniteScroll${name}`];

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

  return { reducer, ...actions, fetchPage };
};
