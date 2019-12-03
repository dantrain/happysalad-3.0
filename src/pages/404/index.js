import React from 'react';
import PageTitle from '../../components/PageTitle';
import StaticPage from '../../components/StaticPage';

const NotFound = () => (
  <StaticPage>
    <PageTitle title="Not Found" />
    <h1>404'd!!</h1>
    <p>Well this is embarassing.</p>
  </StaticPage>
);

export default NotFound;
