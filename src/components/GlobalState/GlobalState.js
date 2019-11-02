import React, { createContext, useReducer, useContext, useEffect } from 'react';

function reducer(state, { type, payload }) {
  switch (type) {
    case 'PAGE_LOAD':
      return payload;
    case 'DATA_LOAD':
      return {
        posts: [...state.posts, ...payload.edges],
        pageInfo: payload.pageInfo,
      };
    default:
      return state;
  }
}

const Context = createContext(null);

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default GlobalState;

export const useGlobalState = initialState => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    if (!state) {
      dispatch({ type: 'PAGE_LOAD', payload: initialState });
    }
  }, []);

  return { state: state || initialState, dispatch };
};

export const wrapWithGlobalState = ({ element }) => (
  <GlobalState>{element}</GlobalState>
);
