import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Page from '../../components/Page';
import VideoPost from '../../components/VideoPost';
import PodcastPost from '../../components/PodcastPost';

import s from './game-page.module.css';

const GamePage = ({
  pageContext: {
    name,
    deck,
    image: { thumb_url },
  },
  data: {
    allContentfulPodcastPost: { edges: podcastPosts },
    allContentfulVideoPost: { edges: videoPosts },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => (
  <Page>
    <Helmet title={`${name} · ${siteTitle}`} />
    <section className={s.intro}>
      <img className={s.thumbImg} src={thumb_url} alt={name} />
      <div className={s.introText}>
        <h1 className={s.title}>{name}</h1>
        <p className={s.deck}>{deck}</p>
      </div>
    </section>
    <ul className={s.postList}>
      {videoPosts.map(({ node }) => (
        <li key={node.slug}>
          <VideoPost {...node} />
        </li>
      ))}
    </ul>
    <ul className={s.postList}>
      {podcastPosts.map(({ node }) => (
        <li key={node.slug}>
          <PodcastPost {...node} />
        </li>
      ))}
    </ul>
  </Page>
);

export default GamePage;

export const pageQuery = graphql`
  query PostsBySlugs($slugs: [String]) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPodcastPost(
      filter: { slug: { in: $slugs } }
      sort: { fields: [recordingDate], order: DESC }
    ) {
      edges {
        node {
          ...PodcastPost
        }
      }
    }
    allContentfulVideoPost(
      filter: { slug: { in: $slugs } }
      sort: { fields: [recordingDate], order: DESC }
    ) {
      edges {
        node {
          ...VideoPost
        }
      }
    }
  }
`;
