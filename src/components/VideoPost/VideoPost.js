import React from 'react';
import { graphql } from 'gatsby';
import Post from '../../components/Post';
import Video from '../../components/Video';
import Markdown from '../../components/Markdown';

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
    titleLinkUrl={`/video-thing/${slug}`}
    title={`Gameplay - ${title}`}
    date={recordingDate}
    dateFormatted={recordingDateFormatted}
    authorName={author.name}
  >
    <Video youTubeUrl={youTubeUrl} />
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
