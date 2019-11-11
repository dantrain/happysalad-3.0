import { combineReducers } from 'redux';
import { configureStore } from 'redux-starter-kit';
import infiniteScroll from './features/infiniteScroll/infiniteScrollSlice';

const rootReducer = combineReducers({ infiniteScroll });

export default () => configureStore({ reducer: rootReducer });
