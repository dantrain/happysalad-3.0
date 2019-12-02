import React from 'react';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { CSSTransition } from 'react-transition-group';
import Container from '../Container';
import Header from '../Header';
import SideBar from '../SideBar';
import Player from '../Player';

import 'normalize.css';

import './variables.css';
import './base.css';

import s from './page.module.css';

const Page = ({ children, pageContext: { hotTopics } }) => {
  const { open } = useSelector(state => state.mobileMenu);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        >
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
            <SideBar hotTopics={hotTopics} />
          </section>
        </div>
      </Container>
      <Player />
    </>
  );
};

const wrapWithPage = ({ element, props }) => <Page {...props}>{element}</Page>;

export default wrapWithPage;
