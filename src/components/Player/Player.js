import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import clamp from 'lodash/clamp';
import { togglePlay, close } from '../../features/player/playerSlice';
import Container from '../Container';
import { CSSTransition } from 'react-transition-group';
import { PlayerContextProvider } from '@cassette/core';
import { VolumeControl, MediaProgress } from '@cassette/player';
import { usePlayerContext } from '@cassette/hooks';
import { Play, Pause, Forward, Backward, Close } from '../Icon';

import './cassette-player.css';
import s from './player.module.css';

const Button = ({ className, ...rest }) => (
  <button className={cn(s.button, className)} type="button" {...rest} />
);

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
  const loading = trackLoading || awaitingPlayResume;

  const dispatch = useDispatch();

  useEffect(() => {
    let timeout;
    if (shouldPlay && paused) {
      timeout = setTimeout(() => onTogglePause(false), 10);
    } else if (!shouldPlay && !paused) {
      timeout = setTimeout(() => onTogglePause(true), 10);
    }

    return () => clearTimeout(timeout);
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
      <div className={s.playerControls}>
        <VolumeControl />
        <div className={s.centerControls}>
          <Button onClick={onSkipBackward}>
            <Backward />
          </Button>
          <Button className={s.playButton} onClick={onTogglePlay}>
            {paused ? <Play /> : <Pause />}
          </Button>
          <Button onClick={onSkipForward}>
            <Forward />
          </Button>
        </div>
        <Button onClick={onClose}>
          <Close />
        </Button>
      </div>
      <div className={cn(s.progressContainer, { [s.loading]: loading })}>
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
        timeout={{ enter: 300, exit: 300 }}
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
