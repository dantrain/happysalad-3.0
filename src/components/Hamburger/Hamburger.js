import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { toggle } from '../../features/mobileMenu/mobileMenuSlice';

import s from './hamburger.module.css';

const Hamburger = ({ className, ...rest }) => {
  const { open } = useSelector(state => state.mobileMenu);
  const dispatch = useDispatch();

  return (
    <button
      className={cn(s.button, className)}
      type="button"
      onClick={() => dispatch(toggle())}
      {...rest}
    >
      <div className={cn(s.container, { [s.open]: open })}>
        <div className={cn(s.bar, s.bar1)}></div>
        <div className={cn(s.bar, s.bar2)}></div>
        <div className={cn(s.bar, s.bar3)}></div>
        <div className={cn(s.bar, s.bar4)}></div>
      </div>
    </button>
  );
};

export default Hamburger;
