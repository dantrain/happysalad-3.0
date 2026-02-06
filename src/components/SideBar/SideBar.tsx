import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'gatsby';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import cn from 'classnames';
import { RootState } from '../../store';
import { close } from '../../features/mobileMenu/mobileMenuSlice';
import GamesList, { GamesListItems } from '../GamesList/GamesList';
import Search from '../Search/Search';
import TimeMachine from '../TimeMachine/TimeMachine';
import { YouTube, Twitter, Facebook } from '../Icon/Icon';

import * as s from './side-bar.module.css';

const tabletLandscapeUp =
  typeof window !== 'undefined' && window.matchMedia('(min-width: 980px)');

const SideBar: React.FC<{ hotTopics: GamesListItems; years: string[] }> = ({
  hotTopics,
  years,
}) => {
  const { url, title } = useSelector((state: RootState) => state.player);
  const { open } = useSelector((state: RootState) => state.mobileMenu);

  const sideBarRef = useRef(null);

  useEffect(() => {
    if (open) {
      sideBarRef.current.scrollTop = 0;
      disableBodyScroll(sideBarRef.current);
    } else {
      enableBodyScroll(sideBarRef.current);
    }

    return () => clearAllBodyScrollLocks();
  }, [open]);

  const dispatch = useDispatch();

  useEffect(() => {
    const listener = (e: MediaQueryListEvent): void => {
      if (e.matches) {
        dispatch(close());
      }
    };

    tabletLandscapeUp.addListener(listener);

    return () => tabletLandscapeUp.removeListener(listener);
  }, []);

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
      <div
        className={cn(s.sideBar, { [s.playerOpen]: url && title })}
        ref={sideBarRef}
      >
        <div className={s.top}>
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
          <TimeMachine years={years} />
        </div>
        <div className={s.bottom}>
          <ul className={s.socialLinkList}>
            <li className={s.socialLink}>
              <a
                className={s.youTube}
                title="YouTube Channel"
                href="https://www.youtube.com/channel/UCeibGWITwPHuSe5-qfGDAGw"
              >
                <YouTube />
              </a>
            </li>
            <li className={s.socialLink}>
              <a
                className={s.twitter}
                title="Twitter Feed"
                href="https://twitter.com/SaladCast"
              >
                <Twitter />
              </a>
            </li>
            <li className={s.socialLink}>
              <a
                className={s.facebook}
                title="Facebook Page"
                href="https://www.facebook.com/happysaladnet/"
              >
                <Facebook />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SideBar;
