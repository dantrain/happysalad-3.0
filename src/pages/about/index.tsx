import React from 'react';
import Markdown from '../../components/Markdown/Markdown';
import StaticPage from '../../components/StaticPage/StaticPage';

import { Helmet } from 'react-helmet';
import Video from '../../components/Video/Video';
import content from './about.md';
import * as s from './about.module.css';

const AboutPage: React.FC = () => (
  <StaticPage>
    <Helmet>
      <title>About</title>
    </Helmet>
    <div className={s.content}>
      <Markdown ast={content} />
    </div>
    <Video youTubeUrl="https://www.youtube.com/watch?v=PNAFhfumurg" />
  </StaticPage>
);

export default AboutPage;
