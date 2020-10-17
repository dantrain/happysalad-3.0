import React from 'react';
import { Helmet } from 'react-helmet';
import StaticPage from '../../components/StaticPage/StaticPage';

const NotFound: React.FC = () => (
  <StaticPage>
    <Helmet>
      <title>Not Found</title>
    </Helmet>
    <h1>404&apos;d!!</h1>
    <p>Well this is embarassing.</p>
  </StaticPage>
);

export default NotFound;
