import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'gatsby';
import cn from 'classnames';
import GamesList from '../GamesList';

import s from './layout.module.css';

const Layout = ({ children, hotTopics }) => {
  const { url, title } = useSelector(state => state.player);

  return (
    <div className={s.layout}>
      <main className={s.main}>{children}</main>
      <section className={s.sideBarContainer}>
        <div className={cn(s.sideBar, { [s.playerOpen]: url && title })}>
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
          <GamesList games={hotTopics} />
        </div>
      </section>
    </div>
  );
};

export default Layout;
