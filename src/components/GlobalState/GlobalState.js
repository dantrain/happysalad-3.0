import React, { createContext, useReducer, useContext, useEffect } from 'react';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'PAGE_LOAD':
      return { loading: false, ...payload };
    case 'DATA_FETCH_START':
      return { ...state, loading: true };
    case 'DATA_FETCH_SUCCESS':
      const pages = state.pages.slice(0);
      pages[payload.pageInfo.currentPage - 1] = payload.edges;

      return {
        pages,
        pageInfo: payload.pageInfo,
        loading: false,
      };
    case 'DATA_FETCH_FAILURE':
      return { ...state, loading: false };
    default:
      return state;
  }
};

const Context = createContext(null);

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null);

  const loadNextPage = async () => {
    if (state) {
      try {
        dispatch({ type: 'DATA_FETCH_START' });
        const response = await fetch(
          `/page-data/${state.pageInfo.currentPage + 1}/page-data.json`
        );
        const data = await response.json();
        const newPage = data.result.data.allPost;

        dispatch({ type: 'DATA_FETCH_SUCCESS', payload: newPage });
      } catch (err) {
        dispatch({ type: 'DATA_FETCH_FAILURE' });
        console.error('Data fetch error', err);
      }
    }
  };

  return (
    <Context.Provider value={{ state, dispatch, loadNextPage }}>
      {children}
    </Context.Provider>
  );
};

export default GlobalState;

export const useGlobalState = initialState => {
  const { state, dispatch, ...rest } = useContext(Context);

  useEffect(() => {
    if (!state) {
      dispatch({ type: 'PAGE_LOAD', payload: initialState });
    }
  }, []);

  return { state: state || initialState, ...rest };
};

export const wrapWithGlobalState = ({ element }) => (
  <GlobalState>{element}</GlobalState>
);
