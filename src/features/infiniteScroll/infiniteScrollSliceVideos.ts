import createInfiniteScrollSlice from './createInfiniteScrollSlice';

const { reducer, initialPageLoad, fetchPage } = createInfiniteScrollSlice(
  'videos',
  'allContentfulVideoPost',
  '/video-thing',
);

export { initialPageLoad, fetchPage };

export default reducer;
