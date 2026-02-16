import React from 'react';

React.createElement('span');

import * as s from './visually-hidden.module.css';

type VisuallyHiddenProps = {
  component?: keyof JSX.IntrinsicElements;
};

const VisuallyHidden: React.FC<
  React.PropsWithChildren<VisuallyHiddenProps>
> = ({ component: Component = 'span', children }) => (
  <Component className={s.visuallyHidden}>{children}</Component>
);

export default VisuallyHidden;
