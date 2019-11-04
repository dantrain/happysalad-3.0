import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import remarkAstToReact from '../../utils/remarkAstToReact';

import s from './podcast-post-tile.module.css';

const PodcastPostTile = ({
  title,
  slug,
  episodeNumber,
  recordingDateFormatted,
  recordingDate,
  author,
  audioFile,
  body,
}) => (
  <article className={s.article}>
    <header className={s.header}>
      <Link to={`/${slug}`}>
        <h2 className={s.title}>
          SaladCast {episodeNumber} - {title}
        </h2>
      </Link>
      <p>
        <time dateTime={recordingDate}>{recordingDateFormatted}</time> - Posted
        by {author.name}
      </p>
    </header>
    <audio
      className={s.audio}
      controls
      src={audioFile.file.url}
      preload="metadata"
    >
      Your browser does not support the
      <code>audio</code> element.
    </audio>
    {remarkAstToReact(body.childMarkdownRemark.htmlAst)}
  </article>
);

export default PodcastPostTile;

export const query = graphql`
  fragment PodcastPostTile on ContentfulPodcastPost {
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
  }
`;
