import React, { useRef, useEffect } from 'react';
import throttleFn from 'lodash/throttle';

type InfiniteScrollProps = {
  threshold?: number;
  throttle?: number;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  threshold = 800,
  throttle = 100,
  hasMore,
  isLoading,
  onLoadMore,
}) => {
  const sentinel = useRef(null);

  useEffect(() => {
    const checkWindowScroll = (): void => {
      if (
        !isLoading &&
        hasMore &&
        sentinel.current.getBoundingClientRect().top - window.innerHeight <
          threshold
      ) {
        onLoadMore();
      }
    };

    const scrollHandler = throttleFn(checkWindowScroll, throttle);

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', scrollHandler, { passive: true });

    checkWindowScroll();

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', scrollHandler);
    };
  });

  return (
    <>
      {children}
      <div ref={sentinel} />
    </>
  );
};

export default InfiniteScroll;
