import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import defer from 'lodash/defer';
import clamp from 'lodash/clamp';
import { togglePlay, close } from '../../features/player/playerSlice';
import Container from '../Container';
import { CSSTransition } from 'react-transition-group';
import { PlayerContextProvider } from '@cassette/core';
import { VolumeControl, MediaProgress } from '@cassette/player';
import { usePlayerContext } from '@cassette/hooks';

import '@cassette/player/dist/css/cassette-player.css';

import s from './player.module.css';

const MediaPlayer = () => {
  const { playing: shouldPlay } = useSelector(state => state.player);
  const {
    paused,
    onTogglePause,
    trackLoading,
    awaitingPlayResume,
    currentTime,
    duration,
    onSeekComplete,
  } = usePlayerContext([
    'paused',
    'onTogglePause',
    'trackLoading',
    'awaitingPlayResume',
    'currentTime',
    'duration',
    'onSeekComplete',
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldPlay && paused) {
      defer(() => onTogglePause(false));
    } else if (!shouldPlay && !paused) {
      defer(() => onTogglePause(true));
    }
  }, [shouldPlay, paused]);

  const onTogglePlay = () => dispatch(togglePlay());
  const onClose = () => dispatch(close());
  const onSkipForward = () => {
    onSeekComplete(clamp(currentTime + 10, 0, duration));
  };
  const onSkipBackward = () => {
    onSeekComplete(clamp(currentTime - 10, 0, duration));
  };

  return (
    <>
      <div>
        <button onClick={onSkipBackward}>-10s</button>
        <button onClick={onTogglePlay}>
          {paused
            ? 'Play'
            : trackLoading || awaitingPlayResume
            ? 'Loading...'
            : 'Pause'}
        </button>
        <button onClick={onSkipForward}>+10s</button>
        <button onClick={onClose}>Close</button>
        <div
          style={{
            background: '#333',
            display: 'inline-block',
          }}
        >
          <VolumeControl />
        </div>
      </div>
      <div
        style={{
          background: '#333',
          height: 50,
          display: 'flex',
        }}
      >
        <MediaProgress />
      </div>
    </>
  );
};

const Player = () => {
  const { url, title } = useSelector(state => state.player);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    if (url && title) {
      setPlaylist([{ url, title }]);
    }
  }, [url, title]);

  return (
    <footer className={s.footer}>
      <CSSTransition
        in={!!url && !!playlist}
        timeout={{ enter: 300, exit: 200 }}
        classNames={{
          enter: s.footerContentEnter,
          enterActive: s.footerContentEnterActive,
          exit: s.footerContentExit,
          exitActive: s.footerContentExitActive,
        }}
        unmountOnExit
      >
        <div className={s.footerContent}>
          <Container pad>
            <PlayerContextProvider playlist={playlist}>
              <MediaPlayer />
            </PlayerContextProvider>
          </Container>
        </div>
      </CSSTransition>
    </footer>
  );
};

export default Player;
