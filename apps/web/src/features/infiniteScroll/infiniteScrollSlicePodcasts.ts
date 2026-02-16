import createInfiniteScrollSlice from './createInfiniteScrollSlice';

const { reducer, initialPageLoad, fetchPage } = createInfiniteScrollSlice(
  'podcasts',
  'allContentfulPodcastPost',
  '/saladcast',
);

export { initialPageLoad, fetchPage };

export default reducer;
