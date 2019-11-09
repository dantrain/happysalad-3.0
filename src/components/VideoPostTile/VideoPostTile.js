import React from 'react';
import { Link, graphql } from 'gatsby';
import YouTube from 'react-youtube';
import Markdown from '../../components/Markdown';

import s from './video-post-tile.module.css';

const videoIdRegex = /(?:.*|\/|v=)([a-zA-Z\d_-]{11})/;

const VideoPostTile = ({
  title,
  slug,
  recordingDateFormatted,
  recordingDate,
  author,
  youTubeUrl,
  body,
}) => (
  <article className={s.article}>
    <header className={s.header}>
      <Link to={`/${slug}`}>
        <h2 className={s.title}>Gameplay - {title}</h2>
      </Link>
      <p className={s.byline}>
        <strong>
          <time dateTime={recordingDate}>{recordingDateFormatted}</time>
        </strong>{' '}
        - Posted by <strong>{author.name}</strong>
      </p>
    </header>
    <YouTube
      className={s.youTubePlayer}
      videoId={videoIdRegex.exec(youTubeUrl)[1]}
    />
    <Markdown ast={body.childMarkdownRemark.htmlAst} />
  </article>
);

export default VideoPostTile;

export const query = graphql`
  fragment VideoPostTile on ContentfulVideoPost {
    slug
    title
    recordingDateFormatted: recordingDate(formatString: "Do MMMM YYYY")
    recordingDate
    author {
      name
    }
    youTubeUrl
    body {
      childMarkdownRemark {
        htmlAst
      }
    }
  }
`;
