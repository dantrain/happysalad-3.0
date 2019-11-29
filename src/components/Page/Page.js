import React from 'react';
import Helmet from 'react-helmet';
import Container from '../Container';
import Header from '../Header';
import Player from '../Player';

import 'normalize.css';

import './variables.css';
import './base.css';

const Page = ({ children }) => (
  <>
    <Helmet>
      <html lang="en" />
    </Helmet>
    <Header />
    <Container>{children}</Container>
    <Player />
  </>
);

export default Page;
