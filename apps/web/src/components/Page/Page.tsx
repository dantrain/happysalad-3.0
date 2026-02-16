import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '../../store';
import Container from '../Container/Container';
import { GamesListItems } from '../GamesList/GamesList';
import Header from '../Header/Header';
import Player from '../Player/Player';
import SideBar from '../SideBar/SideBar';

import 'normalize.css';

import './base.css';
import './variables.css';

import * as s from './page.module.css';

type PageProps = {
  pageContext: {
    hotTopics: GamesListItems;
    years: string[];
  };
};

const Page: React.FC<React.PropsWithChildren<PageProps>> = ({
  children,
  pageContext: { hotTopics, years },
}) => {
  const { open } = useSelector((state: RootState) => state.mobileMenu);

  return (
    <>
      <Header />
      <Container>
        <div className={s.layout}>
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
            <main className={s.main}>{children}</main>
          </CSSTransition>
          <section className={s.sideBarContainer}>
            <SideBar hotTopics={hotTopics} years={years} />
          </section>
        </div>
      </Container>
      <Player />
    </>
  );
};

const wrapWithPage: React.FC<{ element: ReactElement; props: PageProps }> = ({
  element,
  props,
}) => <Page {...props}>{element}</Page>;

export default wrapWithPage;
