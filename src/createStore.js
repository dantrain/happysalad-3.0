import { configureStore } from 'redux-starter-kit';
import infiniteScroll from './features/infiniteScroll/infiniteScrollSlice';
import player from './features/player/playerSlice';

export default () => configureStore({ reducer: { infiniteScroll, player } });
