import React from 'react';

import * as s from './static-page.module.css';

const StaticPage: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={s.staticPage}>{children}</div>
);

export default StaticPage;
