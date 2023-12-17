import './styles/normalize.css';
import './styles/style.css';

import { initEventHandlersWithAsyncAwait } from './logic/eventHandlers';

const updateClock = (clock) => {
  clock.textContent = new Date().toLocaleTimeString([], { timeStyle: 'short' });
};

document.addEventListener('DOMContentLoaded', () => {
  const clock = document.querySelector('.live-time');
  updateClock(clock);
  setInterval(() => updateClock(clock), 60000);
  initEventHandlersWithAsyncAwait();
});
