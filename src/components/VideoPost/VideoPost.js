import React from 'react';
import { graphql } from 'gatsby';
import YouTube from 'react-youtube';
import Post from '../../components/Post';
import Markdown from '../../components/Markdown';

import s from './video-post.module.css';

const videoIdRegex = /(?:.*|\/|v=)([a-zA-Z\d_-]{11})/;

const VideoPost = ({
  title,
  slug,
  recordingDateFormatted,
  recordingDate,
  author,
  youTubeUrl,
  body,
}) => (
  <Post
    titleLinkSlug={slug}
    title={`Gameplay - ${title}`}
    date={recordingDate}
    dateFormatted={recordingDateFormatted}
    authorName={author.name}
  >
    <YouTube
      className={s.youTubePlayer}
      videoId={videoIdRegex.exec(youTubeUrl)[1]}
    />
    <Markdown ast={body.childMarkdownRemark.htmlAst} />
  </Post>
);

export default VideoPost;

export const query = graphql`
  fragment VideoPost on ContentfulVideoPost {
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
