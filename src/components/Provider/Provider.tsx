import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';

const wrapWithProvider: React.FC<{ element: ReactElement }> = ({ element }) => (
  <Provider store={store}>{element}</Provider>
);

export default wrapWithProvider;
