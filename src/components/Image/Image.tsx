/* eslint-disable react/display-name */
import React, { forwardRef, useCallback, useState } from 'react';

type ImageProps = React.ComponentPropsWithRef<'img'>;

const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const [error, setError] = useState(false);
  const { src, ...rest } = props;

  const onError = useCallback(() => {
    setError(true);
  }, []);

  if (error) return null;

  return (
    <img
      ref={ref}
      src={src.replace(
        'https://giantbomb1.cbsistatic.com/',
        'https://www.giantbomb.com/a/',
      )}
      {...rest}
      onError={onError}
    />
  );
});

export default Image;
