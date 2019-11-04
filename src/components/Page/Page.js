import React from 'react';
import Header from '../Header';
import Container from '../Container';

import './base.css';

const Page = ({ children }) => (
  <>
    <Header />
    <main>
      <Container>{children}</Container>
    </main>
  </>
);

export default Page;
