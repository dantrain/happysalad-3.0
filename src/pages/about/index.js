import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Markdown from '../../components/Markdown';
import StaticPage from '../../components/StaticPage/StaticPage';

import content from './about.md';

const AboutPage = () => (
  <StaticPage>
    <PageTitle title="About" />
    <Markdown ast={content} />
  </StaticPage>
);

export default AboutPage;
