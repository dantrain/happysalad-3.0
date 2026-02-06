import React from 'react';
import { HeadFC } from 'gatsby';
import StaticPage from '../../components/StaticPage/StaticPage';
import SEO from '../../components/SEO';

const NotFound: React.FC = () => (
  <StaticPage>
    <h1>404&apos;d!!</h1>
    <p>Well this is embarassing.</p>
  </StaticPage>
);

export default NotFound;

export const Head: HeadFC = () => <SEO title="Not Found" />;
