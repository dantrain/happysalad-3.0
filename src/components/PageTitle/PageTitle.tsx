import React from 'react';
import { Helmet } from 'react-helmet';

type PageTitleProps = { title?: string };

const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <Helmet
    title={
      title
        ? `${title} · Happysalad`
        : 'Happysalad · The Saladcast, a podcast about video games'
    }
  />
);

export default PageTitle;
