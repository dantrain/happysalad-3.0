import React from 'react';
import Container from '../Container';
import Header from '../Header';
import Player from '../Player';

import 'normalize.css';
import './base.css';
import s from './page.module.css';

const Page = ({ children }) => (
  <>
    <Header />
    <main className={s.main}>
      <Container>{children}</Container>
    </main>
    <Player />
  </>
);

export default Page;
