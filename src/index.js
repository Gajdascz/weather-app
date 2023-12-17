import './styles/normalize.css';
import './styles/style.css';

import { initEventHandlersWithAsyncAwait } from './logic/eventHandlers';

const iconsContext = require.context('./assets/weather-icons', true, /^.png$/);
iconsContext.keys().forEach(iconsContext);

const updateClock = (clock) => {
  clock.textContent = new Date().toLocaleTimeString([], { timeStyle: 'short' });
};

document.addEventListener('DOMContentLoaded', () => {
  const clock = document.querySelector('.live-time');
  updateClock(clock);
  setInterval(() => updateClock(clock), 60000);
  initEventHandlersWithAsyncAwait();
});
