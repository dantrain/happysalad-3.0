import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import GamesList from '../GamesList';
import Search from '../Search';

import s from './side-bar.module.css';

const SideBar = ({ hotTopics }) => {
  const { url, title } = useSelector(state => state.player);
  const { open } = useSelector(state => state.mobileMenu);

  return (
    <CSSTransition
      in={open}
      timeout={{ enter: 300, exit: 200 }}
      classNames={{
        enter: s.enter,
        enterActive: s.enterActive,
        enterDone: s.enterDone,
        exit: s.exit,
        exitActive: s.exitActive,
      }}
    >
      <div className={cn(s.sideBar, { [s.playerOpen]: url && title })}>
        <Search inSideBar />
        <nav>
          <ul>
            <li>
              <Link className={s.navLink} to="/saladcast">
                Saladcast
              </Link>
            </li>
            <li>
              <Link className={s.navLink} to="/video-thing">
                Video Thing
              </Link>
            </li>
            <li>
              <Link className={s.navLink} to="/about">
                About
              </Link>
            </li>
          </ul>
        </nav>
        <h3 className={s.hotTopicsTitle}>Hot Topics</h3>
        <GamesList className={s.gamesList} games={hotTopics} />
      </div>
    </CSSTransition>
  );
};

export default SideBar;
