import React from 'react';
import Helmet from 'react-helmet';

const PageTitle = ({ title }) => (
  <Helmet
    title={
      title
        ? `${title} · Happysalad`
        : 'Happysalad · The Saladcast, a podcast about video games'
    }
  />
);

export default PageTitle;
