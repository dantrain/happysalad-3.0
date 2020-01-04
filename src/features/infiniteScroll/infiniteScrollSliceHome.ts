import createInfiniteScrollSlice from './createInfiniteScrollSlice';

const { reducer, initialPageLoad, fetchPage } = createInfiniteScrollSlice(
  'home',
  'allPost'
);

export { initialPageLoad, fetchPage };

export default reducer;
