import React from 'react';
import Helmet from 'react-helmet';

const PageTitle = ({ title }) => (
  <Helmet title={`${title ? `${title} · ` : ''}Happysalad`} />
);

export default PageTitle;
