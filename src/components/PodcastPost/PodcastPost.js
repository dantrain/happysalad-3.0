import React from 'react';
import { graphql } from 'gatsby';
import Post from '../../components/Post';
import Markdown from '../../components/Markdown';
import GamesList from '../../components/GamesList';

import s from './podcast-post.module.css';

const PodcastPost = ({
  title,
  slug,
  episodeNumber,
  recordingDateFormatted,
  recordingDate,
  author,
  audioFile,
  body,
  games,
}) => (
  <Post
    titleLinkSlug={slug}
    title={`Saladcast ${episodeNumber} - ${title}`}
    date={recordingDate}
    dateFormatted={recordingDateFormatted}
    authorName={author.name}
  >
    <audio
      className={s.audio}
      controls
      src={audioFile.file.url}
      preload="metadata"
    >
      Your browser does not support the
      <code>audio</code> element.
    </audio>
    <Markdown ast={body.childMarkdownRemark.htmlAst} />
    {games && games.games && games.games.length && (
      <>
        <h3 className={s.gamesListHeading}>In this podcast:</h3>
        <GamesList games={games.games} />
      </>
    )}
  </Post>
);

export default PodcastPost;

export const query = graphql`
  fragment PodcastPost on ContentfulPodcastPost {
    slug
    title
    episodeNumber
    recordingDateFormatted: recordingDate(formatString: "Do MMMM YYYY")
    recordingDate
    author {
      name
    }
    audioFile {
      file {
        url
        details {
          size
        }
      }
    }
    body {
      childMarkdownRemark {
        htmlAst
      }
    }
    games {
      games {
        id
        name
        image {
          icon_url
        }
      }
    }
  }
`;
