import React, { useCallback, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { Link } from 'gatsby';

import s from './time-machine.module.css';

const TimeMachine: React.FC<{ years: string[] }> = ({ years }) => {
  const [open, setOpen] = useState(false);

  const handleToggleOpen = useCallback(() => setOpen((state) => !state), []);

  return (
    <div className={s.timeMachine}>
      <button className={s.button} onClick={handleToggleOpen}>
        Time Machine
        <svg className={s.chevron} width="10" height="6">
          <polygon
            points={open ? '0,6 10,6 5,0' : '0,0 10,0 5,6'}
            fill="currentColor"
          />
        </svg>
      </button>
      <AnimateHeight
        height={open ? 'auto' : 0}
        duration={200}
        easing="cubic-bezier(0.645, 0.045, 0.355, 1.000)"
      >
        <nav className={s.nav}>
          <ul>
            {years.map((year) => (
              <li key={year} className={s.item}>
                <Link className={s.link} to={`/${year}`}>
                  {year}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </AnimateHeight>
    </div>
  );
};

export default TimeMachine;
