import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Markdown from '../../components/Markdown/Markdown';
import StaticPage from '../../components/StaticPage/StaticPage';

import content from './about.md';

const AboutPage: React.FC = () => (
  <StaticPage>
    <PageTitle title="About" />
    <Markdown ast={content} />
  </StaticPage>
);

export default AboutPage;
