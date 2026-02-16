import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { CSSTransition } from 'react-transition-group';
import YouTube from 'react-youtube';
import { useImage } from 'react-image';
import { RootState } from '../../store';
import { pause } from '../../features/player/playerSlice';
import Vh from '../VisuallyHidden/VisuallyHidden';
import onMobile from '../../utils/onMobile';

import * as s from './video.module.css';

const videoIdRegex = /(?:.*|\/|v=)([a-zA-Z\d_-]{11})/;

const prefetchUrls = [
  'https://www.youtube.com',
  'https://www.google.com',
  'https://googleads.g.doubleclick.net',
  'https://static.doubleclick.net',
];

const PlayIcon: React.FC = () => (
  <svg
    className={s.playIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 68 48"
    role="img"
  >
    <path
      className={s.playIconOuter}
      d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
    />
    <path className={s.playIconInner} d="M 45,24 27,14 27,34" />
  </svg>
);

interface YouTubePlayer {
  getPlayerState: () => number;
  pauseVideo: () => void;
}

const YouTubeEmbed: React.FC<{ videoId: string }> = ({ videoId }) => {
  const dispatch = useDispatch();
  const onPlay = useCallback(() => dispatch(pause()), [dispatch]);

  const playerRef = useRef<YouTubePlayer | null>(null);
  const onReady = useCallback(
    (event) => (playerRef.current = event.target),
    [],
  );

  const { playing } = useSelector((state: RootState) => state.player);

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

const Video: React.FC<{ youTubeUrl: string }> = ({ youTubeUrl }) => {
  const videoId = encodeURIComponent(videoIdRegex.exec(youTubeUrl)[1]);

  const { src: posterUrl } = useImage({
    srcList: [
      `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    ],
    imgPromise: (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          if (img.naturalWidth < 121) reject();
          if (img.decode) {
            img.decode().then(resolve).catch(reject);
          } else {
            resolve();
          }
        };
        img.onerror = reject;
        img.src = src;
      }),
    useSuspense: false,
  });

  const [showEmbed, setShowEmbed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onMobile) return;

    const el = containerRef.current;
    if (!el) return;

    let isVisible = false;
    let isScrollIdle = true;
    let scrollTimeout: NodeJS.Timeout;

    const SCROLL_IDLE = 150;

    const maybeShow = (): void => {
      if (isVisible && isScrollIdle) {
        setShowEmbed(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        maybeShow();
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    const onScroll = (): void => {
      isScrollIdle = false;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollIdle = true;
        maybeShow();
      }, SCROLL_IDLE);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      <Helmet>
        {prefetchUrls.map((url) => (
          <link key={url} rel="preconnect" href={url} crossOrigin="anonymous" />
        ))}
      </Helmet>
      <div
        ref={containerRef}
        className={s.videoContainer}
        style={
          posterUrl && {
            backgroundImage: `url(${posterUrl})`,
          }
        }
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
