import React from 'react';
import StaticPage from '../../components/StaticPage/StaticPage';
import SEO from '../../components/SEO';

const NotFound: React.FC = () => (
  <StaticPage>
    <SEO title="Not Found" />
    <h1>404&apos;d!!</h1>
    <p>Well this is embarassing.</p>
  </StaticPage>
);

export default NotFound;
