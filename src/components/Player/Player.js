import React from 'react';
import Container from '../Container';
import {
  PlayButton,
  VolumeControl,
  Progress,
  Timer,
} from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';

import s from './player.module.css';

const streamUrl =
  'http://downloads.ctfassets.net/pyajqgkn0two/7VWgtDRiru2vHrp70rZgz/9fa8a17caca07a4bd741965e570b97c6/253__02-11-19_.mp3';

const SoundPlayer = withCustomAudio(props => {
  const { playing, seeking } = props;

  return (
    <div className={s.soundPlayer}>
      <PlayButton className={s.playButton} {...props} />
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
      <SoundPlayer streamUrl={streamUrl} preloadType="metadata" clientId="x" />
    </Container>
  </footer>
);

export default Player;
