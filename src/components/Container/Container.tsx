import React from 'react';
import cn from 'classnames';

import * as s from './container.module.css';

const Container: React.FC<{ className?: string }> = ({
  className,
  children,
}) => <div className={cn(s.container, className)}>{children}</div>;

export default Container;
