import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '../../store';
import { GamesListItems } from '../GamesList/GamesList';
import Container from '../Container/Container';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import Player from '../Player/Player';

import 'normalize.css';

import './variables.css';
import './base.css';

import s from './page.module.css';

type PageProps = {
  pageContext: {
    hotTopics: GamesListItems;
    years: string[];
  };
};

const Page: React.FC<PageProps> = ({
  children,
  pageContext: { hotTopics, years },
}) => {
  const { open } = useSelector((state: RootState) => state.mobileMenu);

  return (
    <>
      <Helmet
        titleTemplate="%s · Happysalad"
        defaultTitle="Happysalad · The Saladcast, a podcast about video games"
      >
        <html lang="en" />
        <meta
          name="description"
          content="The Saladcast, a podcast about video games"
        />
      </Helmet>
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
