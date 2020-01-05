import React from 'react';
import { usePlayerContext } from '@cassette/hooks';
import { VolumeUp, VolumeMute, VolumeDown, VolumeOff } from '../Icon/Icon';

import s from './volume-control.module.css';

const VolumeControl = () => {
  const {
    volume,
    muted,
    onSetVolumeComplete,
    onToggleMuted,
  } = usePlayerContext([
    'volume',
    'muted',
    'onSetVolumeComplete',
    'onToggleMuted',
  ]);

  let icon = <VolumeUp />;

  if (muted) {
    icon = <VolumeMute />;
  } else if (volume < 0.6 && volume >= 0.3) {
    icon = <VolumeDown />;
  } else if (volume < 0.3) {
    icon = <VolumeOff />;
  }

  const handleChange = ({ target: { value } }) => {
    onSetVolumeComplete(value / 100);
  };

  return (
    <div className={s.volumeControl}>
      <button
        className={s.button}
        type="button"
        onClick={() => onToggleMuted()}
      >
        {icon}
      </button>
      <div className={s.sliderContainer}>
        <input
          className={s.slider}
          type="range"
          min="0"
          max="100"
          step="1"
          value={muted ? 0 : volume * 100}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
