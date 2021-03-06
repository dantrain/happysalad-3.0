import React from 'react';
import { graphql } from 'gatsby';
import { VideoPostFragment } from '../../../types/graphql-types';
import Post from '../Post/Post';
import GameLink from '../GameLink/GameLink';
import Video from '../Video/Video';
import Markdown from '../Markdown/Markdown';

type VideoPostProps = {
  gameLink?: boolean;
} & VideoPostFragment;

const VideoPost: React.FC<VideoPostProps> = ({
  title,
  slug,
  recordingDateFormatted,
  recordingDate,
  author,
  youTubeUrl,
  body,
  games,
  gameLink = true,
}) => (
  <Post
    titleLinkUrl={`/video-thing/${slug}`}
    title={`Gameplay - ${title}`}
    date={recordingDate}
    dateFormatted={recordingDateFormatted}
    authorName={author.name}
    imageSlot={
      gameLink &&
      games?.games?.length && (
        <GameLink
          name={games.games[0].name}
          image={games.games[0].image.icon_url}
        />
      )
    }
  >
    <Video youTubeUrl={youTubeUrl} />
    <Markdown ast={body?.childMarkdownRemark?.htmlAst} />
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
