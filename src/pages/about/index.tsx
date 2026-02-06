import React from 'react';
import Markdown from '../../components/Markdown/Markdown';
import StaticPage from '../../components/StaticPage/StaticPage';
import Video from '../../components/Video/Video';
import content from './about.md';
import * as s from './about.module.css';
import SEO from '../../components/SEO';

const AboutPage: React.FC = () => (
  <StaticPage>
    <SEO title="About" />
    <div className={s.content}>
      <Markdown ast={content} />
    </div>
    <Video youTubeUrl="https://www.youtube.com/watch?v=PNAFhfumurg" />
  </StaticPage>
);

export default AboutPage;
