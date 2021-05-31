/* eslint-disable react/display-name */
import React, { useState, useCallback, forwardRef } from 'react';

type ImageProps = React.ComponentPropsWithRef<'img'>;

const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const [error, setError] = useState(false);

  const onError = useCallback(() => {
    setError(true);
  }, []);

  if (error) return null;

  return <img ref={ref} {...props} onError={onError} />;
});

export default Image;
