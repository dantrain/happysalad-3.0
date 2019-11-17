import { configureStore } from 'redux-starter-kit';
import infiniteScrollHome from './features/infiniteScroll/infiniteScrollSliceHome';
import infiniteScrollPodcasts from './features/infiniteScroll/infiniteScrollSlicePodcasts';
import infiniteScrollVideos from './features/infiniteScroll/infiniteScrollSliceVideos';
import player from './features/player/playerSlice';

export default () =>
  configureStore({
    reducer: {
      infiniteScrollHome,
      infiniteScrollPodcasts,
      infiniteScrollVideos,
      player,
    },
  });
