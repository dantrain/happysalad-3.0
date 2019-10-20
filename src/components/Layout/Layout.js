import React from 'react';
import base from './base.css';
import Container from '../Container';
import Navigation from '../Navigation';

const Layout = ({ children }) => (
  <Container>
    <Navigation />
    {children}
  </Container>
);

export default Layout;
