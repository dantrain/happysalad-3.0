import React from 'react';
import cn from 'classnames';

import s from './container.module.css';

const Container = ({ className, children }) => (
  <div className={cn(s.container, className)}>{children}</div>
);

export default Container;
