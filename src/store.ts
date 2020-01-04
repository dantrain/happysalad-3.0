import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import infiniteScrollHome from './features/infiniteScroll/infiniteScrollSliceHome';
import infiniteScrollPodcasts from './features/infiniteScroll/infiniteScrollSlicePodcasts';
import infiniteScrollVideos from './features/infiniteScroll/infiniteScrollSliceVideos';
import searchData from './features/searchData/searchDataSlice';
import player from './features/player/playerSlice';
import mobileMenu from './features/mobileMenu/mobileMenuSlice';

const rootReducer = combineReducers({
  infiniteScrollHome,
  infiniteScrollPodcasts,
  infiniteScrollVideos,
  searchData,
  player,
  mobileMenu,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
