import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import VideoPost from '../../components/VideoPost';
import PodcastPost from '../../components/PodcastPost';

import s from './game-page.module.css';

const GamePage = ({
  pageContext: {
    name,
    deck,
    image: { small_url: imgUrl },
    hotTopics,
  },
  data: {
    allContentfulPodcastPost: { edges: podcastPosts },
    allContentfulVideoPost: { edges: videoPosts },
  },
}) => (
  <Layout hotTopics={hotTopics}>
    <PageTitle title={name} />
    <section className={s.intro}>
      <img className={s.thumbImg} src={imgUrl} alt={name} />
      <div className={s.introText}>
        <h1 className={s.title}>{name}</h1>
        <p className={s.deck}>{deck}</p>
      </div>
    </section>
    <ul>
      {videoPosts.map(({ node }) => (
        <li key={node.slug}>
          <VideoPost {...node} />
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
  </Layout>
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
