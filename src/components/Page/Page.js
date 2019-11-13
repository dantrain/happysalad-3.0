import React from 'react';
import Header from '../Header';

import './base.css';
import s from './page.module.css';

const Page = ({ children }) => (
  <>
    <Header />
    <main className={s.main}>
      <div className={s.container}>{children}</div>
    </main>
  </>
);

export default Page;
