import React from 'react';
import Container from '../Container';
import Header from '../Header';
import Player from '../Player';

import 'normalize.css';
import './variables.css';
import './base.css';

const Page = ({ children }) => (
  <>
    <Header />
    <Container>{children}</Container>
    <Player />
  </>
);

export default Page;
