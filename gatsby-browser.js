import wrapWithProvider from './src/components/Provider/Provider';
import wrapWithPage from './src/components/Page/Page';
import store from './src/store';
import { close } from './src/features/mobileMenu/mobileMenuSlice';

export const wrapRootElement = wrapWithProvider;
export const wrapPageElement = wrapWithPage;

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    if (window.innerWidth > 768) return;
    const main = document.querySelector('main');
    if (main) {
      main.style.visibility = 'hidden';
      if (main.parentElement) main.parentElement.style.background = 'white';
    }
    setTimeout(() => {
      const m = document.querySelector('main');
      if (m) {
        m.style.visibility = '';
        if (m.parentElement) m.parentElement.style.background = '';
      }
    }, 200);
  });
}

export const onRouteUpdate = () => {
  const main = document.querySelector('main');
  if (main) {
    main.style.visibility = '';
    if (main.parentElement) main.parentElement.style.background = '';
  }
  setTimeout(() => store.dispatch(close()), 100);
};
