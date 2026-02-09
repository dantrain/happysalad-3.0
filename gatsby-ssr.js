import React from 'react';
import wrapWithProvider from './src/components/Provider/Provider';
import wrapWithPage from './src/components/Page/Page';

export const wrapRootElement = wrapWithProvider;
export const wrapPageElement = wrapWithPage;

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="scroll-restoration"
      dangerouslySetInnerHTML={{
        __html: `if(history.scrollRestoration)history.scrollRestoration='manual';`,
      }}
    />,
  ]);
};
