# Happysalad 3.0

[![Netlify Status](https://api.netlify.com/api/v1/badges/0bea5497-9a73-4025-aaa9-2ed81af9891f/deploy-status)](https://app.netlify.com/sites/happysalad/deploys)

The third iteration of the Salad.

## Tech stack

- [React](https://react.dev/)
- [Gatsby](https://www.gatsbyjs.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Cassette](https://github.com/benwiley4000/cassette)
- [Lunr](https://lunrjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostCSS](https://postcss.org/)
- [Contentful](https://www.contentful.com/)

## Prerequisites

- [Node.js](https://nodejs.org/en/) v24+
- [pnpm](https://pnpm.io/)

## Getting started

- Clone the repo.
- Copy `.env.example` to `.env` and fill in the values:
  - `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` - found in Contentful under Settings -> API Keys.
  - `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET` - from the [Twitch Developer Console](https://dev.twitch.tv/console) (not required for local development).
- Run `pnpm install`.
- Run `pnpm start`.
