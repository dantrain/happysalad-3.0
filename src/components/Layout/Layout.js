import React from 'react';
import { Link } from 'gatsby';
import GamesList from '../GamesList';

import s from './layout.module.css';

const Layout = ({ children, hotTopics }) => (
  <div className={s.layout}>
    <main className={s.main}>{children}</main>
    <section className={s.sideBarContainer}>
      <div className={s.sideBar}>
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
          </ul>
        </nav>
        <h3 className={s.hotTopicsTitle}>Hot Topics</h3>
        <GamesList games={hotTopics} />
      </div>
    </section>
  </div>
);

export default Layout;
