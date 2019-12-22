import React from 'react';
import { graphql } from 'gatsby';
import { decode } from 'he';
import PageTitle from '../../components/PageTitle';
import VideoPost from '../../components/VideoPost';
import PodcastPost from '../../components/PodcastPost';

import s from './game-page.module.css';

const GamePage = ({
  pageContext: {
    name,
    deck,
    image: { small_url: imgUrl },
  },
  data: {
    allContentfulPodcastPost: { edges: podcastPosts },
    allContentfulVideoPost: { edges: videoPosts },
  },
}) => (
  <>
    <PageTitle title={name} />
    <section className={s.intro}>
      <img
        className={s.thumbImg}
        src={imgUrl}
        alt={name}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className={s.introText}>
        <h1 className={s.title}>{name}</h1>
        {deck !== name && <p className={s.deck}>{decode(deck)}</p>}
      </div>
    </section>
    <ul>
      {videoPosts.map(({ node }) => (
        <li key={node.slug}>
          <VideoPost {...node} gameLink={false} />
        </li>
      ))}
    </ul>
    <ul>
      {podcastPosts.map(({ node }) => (
        <li key={node.slug}>
          <PodcastPost {...node} />
        </li>
      ))}
    </ul>
  </>
);

export default GamePage;

export const pageQuery = graphql`
  query PostsBySlugs($slugs: [String]) {
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
      sort: { fields: [recordingDate], order: ASC }
    ) {
      edges {
        node {
          ...VideoPost
        }
      }
    }
  }
`;
