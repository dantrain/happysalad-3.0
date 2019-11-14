import React from 'react';
import cn from 'classnames';

import s from './container.module.css';

const Container = ({ pad, children }) => (
  <div className={cn(s.container, { [s.pad]: pad })}>{children}</div>
);

export default Container;
