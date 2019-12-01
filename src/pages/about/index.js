import React from 'react';
import PageTitle from '../../components/PageTitle';
import Markdown from '../../components/Markdown';

import s from './about.module.css';
import content from './about.md';

const AboutPage = () => (
  <>
    <PageTitle title="About" />
    <div className={s.about}>
      <Markdown ast={content} />
    </div>
  </>
);

export default AboutPage;
