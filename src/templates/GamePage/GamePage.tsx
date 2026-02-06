import React from 'react';
import { graphql, HeadFC } from 'gatsby';
import { decode } from 'he';
import VideoPost from '../../components/VideoPost/VideoPost';
import PodcastPost from '../../components/PodcastPost/PodcastPost';
import Image from '../../components/Image/Image';
import SEO from '../../components/SEO';

import * as s from './game-page.module.css';

type GamePageProps = {
  pageContext: { name: string; deck: string; image: { small_url: string } };
  data: Queries.PostsBySlugsQuery;
};

const GamePage: React.FC<GamePageProps> = ({
  pageContext: {
    name,
    deck,
    image: { small_url: imgUrl },
  },
  data: {
    allContentfulPodcastPost: { edges: podcastPosts },
    allContentfulVideoPost: { edges: videoPosts },
  },
}) => {
  const description = deck && deck !== name && decode(deck);

  return (
    <>
      <section className={s.intro}>
        <Image className={s.thumbImg} src={imgUrl} alt={name} />
        <div className={s.introText}>
          <h1 className={s.title}>{name}</h1>
          {description && <p className={s.deck}>{description}</p>}
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
};

export default GamePage;

export const Head: HeadFC<
  Queries.PostsBySlugsQuery,
  { name: string; deck: string }
> = ({ pageContext: { name } }) => <SEO title={name} />;

export const pageQuery = graphql`
  query PostsBySlugs($slugs: [String]) {
    allContentfulPodcastPost(
      filter: { slug: { in: $slugs } }
      sort: { recordingDate: DESC }
    ) {
      edges {
        node {
          ...PodcastPost
        }
      }
    }
    allContentfulVideoPost(
      filter: { slug: { in: $slugs } }
      sort: { recordingDate: ASC }
    ) {
      edges {
        node {
          ...VideoPost
        }
      }
    }
  }
`;
