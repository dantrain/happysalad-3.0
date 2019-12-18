import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { CSSTransition } from 'react-transition-group';
import YouTube from 'react-youtube';
import { pause } from '../../features/player/playerSlice';
import Vh from '../VisuallyHidden';
import onMobile from '../../utils/onMobile';

import s from './video.module.css';

const videoIdRegex = /(?:.*|\/|v=)([a-zA-Z\d_-]{11})/;

const prefetchUrls = [
  'https://www.youtube.com',
  'https://www.google.com',
  'https://googleads.g.doubleclick.net',
  'https://static.doubleclick.net',
];

const PlayIcon = props => (
  <svg
    className={s.playIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 68 48"
    role="img"
    {...props}
  >
    <path
      className={s.playIconOuter}
      d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
    />
    <path className={s.playIconInner} d="M 45,24 27,14 27,34" />
  </svg>
);

const YouTubeEmbed = ({ videoId }) => {
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
    <YouTube
      className={s.video}
      videoId={videoId}
      onPlay={onPlay}
      onReady={onReady}
      opts={{ playerVars: { autoplay: 1 } }}
    />
  );
};

const Video = ({ youTubeUrl }) => {
  const videoId = encodeURIComponent(videoIdRegex.exec(youTubeUrl)[1]);
  const posterUrl = `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`;

  const [showEmbed, setShowEmbed] = useState(false);

  useEffect(() => {
    let timeout;

    if (onMobile) {
      timeout = setTimeout(() => setShowEmbed(true), 300);
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Helmet>
        {prefetchUrls.map(url => (
          <link key={url} rel="preconnect" href={url} crossOrigin="anonymous" />
        ))}
      </Helmet>
      <div
        className={s.videoContainer}
        style={{ backgroundImage: `url(${posterUrl})` }}
      >
        <CSSTransition
          in={!showEmbed}
          timeout={200}
          classNames={{
            exit: s.playButtonExit,
            exitActive: s.playButtonExitActive,
          }}
          unmountOnExit
        >
          <button className={s.playButton} onClick={() => setShowEmbed(true)}>
            <PlayIcon />
            <Vh>Play video</Vh>
          </button>
        </CSSTransition>
        {showEmbed && <YouTubeEmbed videoId={videoId} />}
      </div>
    </>
  );
};

export default Video;
