import React from 'react';
import { Provider } from 'react-redux';

import store from '../../reduxStore';

const wrapWithProvider = ({ element }) => (
  <Provider store={store}>{element}</Provider>
);

export default wrapWithProvider;
