import React from 'react';
import Container from '../Container';
import Header from '../Header';
import Player from '../Player';

import 'normalize.css';

import './media-queries.css';
import './colors.css';
import './base.css';

const Page = ({ children }) => (
  <>
    <Header />
    <Container>{children}</Container>
    <Player />
  </>
);

export default Page;
