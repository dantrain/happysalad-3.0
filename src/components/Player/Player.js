import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, close } from '../../features/player/playerSlice';
import Container from '../Container';
import { CSSTransition } from 'react-transition-group';
import {
  PlayButton,
  VolumeControl,
  Progress,
  Timer,
} from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';

import s from './player.module.css';

const SoundPlayer = withCustomAudio(props => {
  const { url, playing: shouldPlay } = useSelector(state => state.player);
  const { soundCloudAudio, playing, seeking } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldPlay && (!playing || soundCloudAudio.audio.currentSrc !== url)) {
      soundCloudAudio.play({ streamUrl: url });
    } else if (!shouldPlay && playing) {
      soundCloudAudio.pause();
    }
  }, [url, shouldPlay, playing, soundCloudAudio]);

  const onTogglePlay = useCallback(() => dispatch(togglePlay()), [dispatch]);
  const onClose = useCallback(() => dispatch(close()), [dispatch]);

  return (
    <div className={s.soundPlayer}>
      <PlayButton
        className={s.playButton}
        playing={playing}
        seeking={seeking}
        onTogglePlay={onTogglePlay}
      />
      <VolumeControl
        className={s.volumeControl}
        buttonClassName={s.volumeControlButton}
        rangeClassName={s.volumeControlRange}
        {...props}
      />
      <Progress
        className={s.progress}
        innerClassName={s.progressInner}
        {...props}
      />
      <Timer className={s.timer} {...props} />
      <button className={s.closeButton} type="button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
});

const Player = () => {
  const { url } = useSelector(state => state.player);

  return (
    <footer className={s.footer}>
      <CSSTransition
        in={!!url}
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
            <SoundPlayer preloadType="metadata" clientId="x" />
          </Container>
        </div>
      </CSSTransition>
    </footer>
  );
};

export default Player;
