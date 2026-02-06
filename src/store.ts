import {
  combineReducers,
  configureStore,
  Action,
  ThunkAction,
} from '@reduxjs/toolkit';
import home from './features/infiniteScroll/infiniteScrollSliceHome';
import podcasts from './features/infiniteScroll/infiniteScrollSlicePodcasts';
import videos from './features/infiniteScroll/infiniteScrollSliceVideos';
import searchData from './features/searchData/searchDataSlice';
import player from './features/player/playerSlice';
import mobileMenu from './features/mobileMenu/mobileMenuSlice';

const rootReducer = combineReducers({
  infiniteScroll: combineReducers({ home, podcasts, videos }),
  searchData,
  player,
  mobileMenu,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
// export type AppDispatch = typeof store.dispatch;

export default store;
