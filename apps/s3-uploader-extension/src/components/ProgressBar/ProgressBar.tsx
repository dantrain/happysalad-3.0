import * as Progress from '@radix-ui/react-progress';

import './progress-bar.css';

interface ProgressBarProps {
  value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => (
  <Progress.Root className="root" value={value} max={100}>
    <Progress.Indicator className="indicator" style={{ width: `${value}%` }} />
  </Progress.Root>
);

export default ProgressBar;
