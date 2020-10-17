import React from 'react';
import Markdown from '../../components/Markdown/Markdown';
import StaticPage from '../../components/StaticPage/StaticPage';

import content from './about.md';
import { Helmet } from 'react-helmet';

const AboutPage: React.FC = () => (
  <StaticPage>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Markdown ast={content} />
  </StaticPage>
);

export default AboutPage;
