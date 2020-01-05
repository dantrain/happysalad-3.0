import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import StaticPage from '../../components/StaticPage/StaticPage';

const NotFound: React.FC = () => (
  <StaticPage>
    <PageTitle title="Not Found" />
    <h1>404&apos;d!!</h1>
    <p>Well this is embarassing.</p>
  </StaticPage>
);

export default NotFound;
