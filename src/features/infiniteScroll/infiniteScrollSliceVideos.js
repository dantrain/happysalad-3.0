import createInfiniteScrollSlice from './createInfiniteScrollSlice';

const { reducer, initialPageLoad, fetchPage } = createInfiniteScrollSlice({
  name: 'Videos',
  type: 'allContentfulVideoPost',
  path: '/video-thing',
});

export { initialPageLoad, fetchPage };

export default reducer;
