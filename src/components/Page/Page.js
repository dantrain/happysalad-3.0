import React from 'react';
import Helmet from 'react-helmet';
import Container from '../Container';
import Header from '../Header';
import SideBar from '../SideBar';
import Player from '../Player';

import 'normalize.css';

import './variables.css';
import './base.css';

import s from './page.module.css';

const Page = ({ children, pageContext: { hotTopics } }) => (
  <>
    <Helmet>
      <html lang="en" />
    </Helmet>
    <Header />
    <Container>
      <div className={s.layout}>
        <main className={s.main}>{children}</main>
        <SideBar hotTopics={hotTopics} />
      </div>
    </Container>
    <Player />
  </>
);

const wrapWithPage = ({ element, props }) => <Page {...props}>{element}</Page>;

export default wrapWithPage;
