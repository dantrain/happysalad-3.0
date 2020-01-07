import wrapWithProvider from './src/components/Provider/Provider';
import wrapWithPage from './src/components/Page/Page';
import store from './src/store';
import { close } from './src/features/mobileMenu/mobileMenuSlice';

export const wrapRootElement = wrapWithProvider;
export const wrapPageElement = wrapWithPage;

export const onRouteUpdate = () => {
  setTimeout(() => store.dispatch(close()), 100);
};
