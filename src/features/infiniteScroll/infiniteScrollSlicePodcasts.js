import createInfiniteScrollSlice from './createInfiniteScrollSlice';

const { reducer, initialPageLoad, fetchPage } = createInfiniteScrollSlice({
  name: 'Podcasts',
  type: 'allContentfulPodcastPost',
  path: '/saladcast',
});

export { initialPageLoad, fetchPage };

export default reducer;
