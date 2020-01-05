import React from 'react';

import s from './static-page.module.css';

const StaticPage: React.FC = ({ children }) => (
  <div className={s.staticPage}>{children}</div>
);

export default StaticPage;
