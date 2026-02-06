import React from 'react';

type SEOProps = {
  title?: string;
};

const SEO: React.FC<SEOProps> = ({ title }) => (
  <>
    <html lang="en" />
    {title ? (
      <title>{title} · Happysalad</title>
    ) : (
      <title>Happysalad · The Saladcast, a podcast about video games</title>
    )}
    <meta
      name="description"
      content="The Saladcast, a podcast about video games"
    />
    <meta name="theme-color" content="#ffffff" />
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
  </>
);

export default SEO;
