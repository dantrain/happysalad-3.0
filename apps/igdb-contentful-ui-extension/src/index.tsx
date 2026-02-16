import { createRoot } from 'react-dom/client';
import { init, FieldAppSDK } from '@contentful/app-sdk';
import App from './components/App';

import './index.css';

init<FieldAppSDK>((sdk) => {
  createRoot(document.getElementById('root')!).render(<App sdk={sdk} />);
});
