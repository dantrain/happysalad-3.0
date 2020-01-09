import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import clamp from 'lodash/clamp';
import { CSSTransition } from 'react-transition-group';
import { PlayerContextProvider } from '@cassette/core';
import { MediaProgress } from '@cassette/player';
import { usePlayerContext } from '@cassette/hooks';
import { RootState } from '../../store';
import Container from '../Container/Container';
import Vh from '../VisuallyHidden/VisuallyHidden';
import VolumeControl from '../VolumeControl/VolumeControl';
import {
  PlayCircle,
  PauseCircle,
  Forward,
  Backward,
  Close,
} from '../Icon/Icon';
import { togglePlay, close } from '../../features/player/playerSlice';

import './cassette-player.css';
import s from './player.module.css';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...rest
}) => <button className={cn(s.button, className)} type="button" {...rest} />;

const MediaPlayer: React.FC = () => {
  const { playing: shouldPlay } = useSelector(
    (state: RootState) => state.player
  );
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

  const onTogglePlay = (): ReturnType<typeof togglePlay> =>
    dispatch(togglePlay());

  const onClose = (): ReturnType<typeof close> => dispatch(close());

  const onSkipForward = (): void => {
    onSeekComplete(clamp(currentTime + 10, 0, duration));
  };

  const onSkipBackward = (): void => {
    onSeekComplete(clamp(currentTime - 10, 0, duration));
  };

  return (
    <>
      <div className={s.playerControls}>
        <VolumeControl />
        <div className={s.centerControls}>
          <Button onClick={onSkipBackward}>
            <Backward />
            <Vh>Skip back 10 seconds</Vh>
          </Button>
          <Button className={s.playButton} onClick={onTogglePlay}>
            {shouldPlay ? (
              <>
                <PauseCircle />
                <Vh>Pause</Vh>
              </>
            ) : (
              <>
                <PlayCircle />
                <Vh>Play</Vh>
              </>
            )}
          </Button>
          <Button onClick={onSkipForward}>
            <Forward />
            <Vh>Skip forward 10 seconds</Vh>
          </Button>
        </div>
        <Button onClick={onClose}>
          <Close />
          <Vh>Close player</Vh>
        </Button>
      </div>
      <div className={s.progressContainer}>
        <div className={cn(s.progress, { [s.loading]: loading })}>
          <MediaProgress />
        </div>
      </div>
    </>
  );
};

const Player: React.FC = () => {
  const { url, title } = useSelector((state: RootState) => state.player);
  const playlist = url && title ? [{ url, title }] : [];

  return (
    <footer className={s.footer}>
      <CSSTransition
        in={!!playlist.length}
        timeout={{ enter: 300, exit: 300 }}
        classNames={{
          enter: s.footerContentEnter,
          enterActive: s.footerContentEnterActive,
          enterDone: s.footerContentEnterDone,
          exit: s.footerContentExit,
          exitActive: s.footerContentExitActive,
        }}
      >
        <div className={s.footerContent}>
          <Container className={s.container}>
            <PlayerContextProvider playlist={playlist} autoplay>
              <MediaPlayer />
            </PlayerContextProvider>
          </Container>
        </div>
      </CSSTransition>
    </footer>
  );
};

export default Player;
