import React from 'react';
import { Provider } from 'react-redux';
import Page from '../../components/Page';

import createStore from '../../createStore';

const wrapWithProvider = ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore();
  return (
    <Provider store={store}>
      <Page>{element}</Page>
    </Provider>
  );
};

export default wrapWithProvider;
