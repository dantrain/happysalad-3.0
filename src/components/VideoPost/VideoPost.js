import React, { useCallback, useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { pause } from '../../features/player/playerSlice';
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
}) => {
  const dispatch = useDispatch();
  const onPlay = useCallback(() => dispatch(pause()), [dispatch]);

  const playerRef = useRef(null);
  const onReady = useCallback(event => (playerRef.current = event.target), []);

  const { playing } = useSelector(state => state.player);

  useEffect(() => {
    if (
      playing &&
      playerRef.current &&
      playerRef.current.getPlayerState() === 1
    ) {
      playerRef.current.pauseVideo();
    }
  }, [playing]);

  return (
    <Post
      titleLinkSlug={slug}
      title={`Gameplay - ${title}`}
      date={recordingDate}
      dateFormatted={recordingDateFormatted}
      authorName={author.name}
    >
      <YouTube
        className={s.video}
        containerClassName={s.videoContainer}
        videoId={videoIdRegex.exec(youTubeUrl)[1]}
        onPlay={onPlay}
        onReady={onReady}
      />
      <Markdown ast={body.childMarkdownRemark.htmlAst} />
    </Post>
  );
};

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
