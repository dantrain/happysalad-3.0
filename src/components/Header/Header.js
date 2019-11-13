import React from 'react';
import { Link } from 'gatsby';
import Container from '../Container';

import s from './header.module.css';

const Header = () => (
  <header className={s.header}>
    <div className={s.container}>
      <Link to="/" title="Home">
        <img className={s.logo} src="/images/logo.png" />
      </Link>
    </div>
  </header>
);

export default Header;
