import wrapWithProvider from './src/components/Provider';
import wrapWithPage from './src/components/Page';
import store from './src/reduxStore';
import { close } from './src/features/mobileMenu/mobileMenuSlice';

export const wrapRootElement = wrapWithProvider;
export const wrapPageElement = wrapWithPage;

export const onRouteUpdate = () => {
  setTimeout(() => store.dispatch(close()), 100);
};
