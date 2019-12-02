import { configureStore } from '@reduxjs/toolkit';
import infiniteScrollHome from './features/infiniteScroll/infiniteScrollSliceHome';
import infiniteScrollPodcasts from './features/infiniteScroll/infiniteScrollSlicePodcasts';
import infiniteScrollVideos from './features/infiniteScroll/infiniteScrollSliceVideos';
import player from './features/player/playerSlice';
import mobileMenu from './features/mobileMenu/mobileMenuSlice';

export default () =>
  configureStore({
    reducer: {
      infiniteScrollHome,
      infiniteScrollPodcasts,
      infiniteScrollVideos,
      player,
      mobileMenu,
    },
  });
