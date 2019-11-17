import createInfiniteScrollSlice from './createInfiniteScrollSlice';

const { reducer, initialPageLoad, fetchPage } = createInfiniteScrollSlice({
  name: 'Home',
  type: 'allPost',
});

export { initialPageLoad, fetchPage };

export default reducer;
