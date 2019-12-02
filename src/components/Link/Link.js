import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as GatsbyLink } from 'gatsby';
import { close } from '../../features/mobileMenu/mobileMenuSlice';

const Link = ({ onClick, ...rest }) => {
  const dispatch = useDispatch();

  return (
    <GatsbyLink
      onClick={(...args) => {
        setTimeout(() => dispatch(close()), 150);

        if (onClick) {
          onClick(...args);
        }
      }}
      {...rest}
    />
  );
};

export default Link;
