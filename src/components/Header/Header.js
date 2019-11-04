import React from 'react';
import { Link } from 'gatsby';
import Container from '../Container';

import s from './header.module.css';

const Header = () => (
  <header className={s.header}>
    <Container>
      <Link to="/" title="Home">
        <img className={s.logo} src="/images/logo.png" />
      </Link>
    </Container>
  </header>
);

export default Header;
