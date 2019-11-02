import React, { useRef, useEffect } from 'react';
import throttleFn from 'lodash/throttle';

const InfiniteScroll = ({
  children,
  threshold = 500,
  throttle = 100,
  hasMore,
  isLoading,
  onLoadMore,
}) => {
  const sentinel = useRef(null);

  useEffect(() => {
    const checkWindowScroll = () => {
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

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', scrollHandler);

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
