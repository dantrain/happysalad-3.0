import { configureStore } from 'redux-starter-kit';
import infiniteScroll from './features/infiniteScroll/infiniteScrollSlice';

export default () => configureStore({ reducer: { infiniteScroll } });
