import wrapWithProvider from './src/components/Provider/Provider';
import wrapWithPage from './src/components/Page/Page';
import store from './src/store';
import { close } from './src/features/mobileMenu/mobileMenuSlice';
import { scrollStateCache } from './src/utils/heightCache';

export const wrapRootElement = wrapWithProvider;
export const wrapPageElement = wrapWithPage;

let isPopNavigation = false;

if (typeof window !== 'undefined') {
  if (window.history.scrollRestoration) {
    window.history.scrollRestoration = 'manual';
  }

  // Clear Gatsby's sessionStorage scroll entries so reload starts at top
  for (let i = sessionStorage.length - 1; i >= 0; i--) {
    const key = sessionStorage.key(i);
    if (key && key.startsWith('@@scroll|')) sessionStorage.removeItem(key);
  }

  window.scrollTo(0, 0);

  window.addEventListener('popstate', () => {
    isPopNavigation = true;

    if (
      window.innerWidth > 768 &&
      document.documentElement.scrollHeight <= window.innerHeight
    ) {
      return;
    }

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
    }, 500);
  });
}

export const onRouteUpdate = ({ location }) => {
  if (!isPopNavigation) {
    scrollStateCache.delete(location.pathname);

    // If scroll is near the top (stale Gatsby/browser restoration), reset to 0
    if (window.scrollY > 0 && window.scrollY < window.innerHeight / 2) {
      window.scrollTo(0, 0);
    }
  }

  isPopNavigation = false;

  const main = document.querySelector('main');

  if (main) {
    main.style.visibility = '';
    if (main.parentElement) main.parentElement.style.background = '';
  }

  setTimeout(() => store.dispatch(close()), 100);
};
