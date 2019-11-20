import React from 'react';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import Markdown from '../../components/Markdown';

import s from './about.module.css';
import content from './about.md';

const AboutPage = ({ pageContext: { hotTopics } }) => (
  <Layout hotTopics={hotTopics}>
    <PageTitle title="About" />
    <div className={s.about}>
      <Markdown ast={content} />
    </div>
  </Layout>
);

export default AboutPage;
