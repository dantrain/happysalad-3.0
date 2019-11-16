import React from 'react';

import s from './visually-hidden.module.css';

const VisuallyHidden = ({
  component: Component = 'span',
  children,
  ...rest
}) => (
  <Component className={s.visuallyHidden} {...rest}>
    {children}
  </Component>
);

export default VisuallyHidden;
