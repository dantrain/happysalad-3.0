import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay } from '../../features/player/playerSlice';
import Container from '../Container';
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
    </div>
  );
});

const Player = () => (
  <footer className={s.footer}>
    <Container pad>
      <SoundPlayer preloadType="metadata" clientId="x" />
    </Container>
  </footer>
);

export default Player;
