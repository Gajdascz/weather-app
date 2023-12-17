import { refreshDisplay } from './ui.js';

import { settings } from './userSettings.js';
import { userStorage } from './storage.js';

import { saveLocation, removeSavedLocation, initSavedLocations } from './savedLocation.js';

import { updateLocationByGeoAsync, updateLocationByInputAsync } from './updateLocation.js';

function initEventHandlersWithAsyncAwait() {
  const sidebar = document.querySelector('section.sidebar');
  const getMyLocBtn = sidebar.querySelector('.get-my-location-button');
  const searchBarBtn = sidebar.querySelector('button.search-bar-button');
  const searchBar = sidebar.querySelector('input.search-input');
  const optionSwitches = sidebar.querySelectorAll('.switch');
  const saveThisLocationBtn = document.querySelector('button.save-this-location-button');
  const userSettings = initSettings();

  if (navigator.geolocation) {
    updateLocationByGeoAsync();
    initGeoBtnAsync(getMyLocBtn);
  } else {
    updateLocationByInputAsync('Bald Knob');
    getMyLocBtn.toggleAttribute('disabled');
  }
  initSearchBtnAsync(searchBarBtn, searchBar);

  initOptionSwitches(optionSwitches, userSettings);

  initSaveLocationBtn(saveThisLocationBtn, userSettings);

  initSavedLocations(userSettings);
}

const initGeoBtnAsync = (btn) => btn.addEventListener('click', (e) => updateLocationByGeoAsync());
const initSearchBtnAsync = (btn, inputField) =>
  btn.addEventListener('click', (e) => updateLocationByInputAsync(inputField.value));

const initSettings = () => userStorage.getSettingsDataObj() ?? settings();

const initOptionSwitches = (switches, userSettings) => {
  matchSwitchesToSettings(switches, userSettings);
  switches.forEach((optionSwitch) => {
    const slider = optionSwitch.querySelector('.switch-slider');
    slider.addEventListener('click', (e) => {
      const options = optionSwitch.querySelector('.switch-options');
      [...options.children].forEach((option) => {
        option.classList.toggle('switch-active-option');
        if (option.classList.contains('switch-active-option')) {
          userSettings[option.dataset.property] = option.dataset.value;
        }
      });
      userStorage.storeSettings(userSettings);
      refreshDisplay(userStorage.getCurrentWeatherDataObj(), userStorage.getForecastWeatherDataObj(), userSettings);
    });
  });
};

const matchSwitchesToSettings = (switches, userSettings) => {
  switches.forEach((optionSwitch) => {
    const options = optionSwitch.querySelector('.switch-options');
    [...options.children].forEach((option) => {
      if (option.dataset.value === userSettings[option.dataset.property]) {
        option.classList.add('switch-active-option');
        if (option.classList.contains('switch-option-right')) {
          optionSwitch.querySelector('.switch-input-checkbox').checked = true;
        }
      } else option.classList.remove('switch-active-option');
    });
  });
};

const initSaveLocationBtn = (btn, userSettings) => {
  btn.addEventListener('click', (e) => {
    const currentLocation = document.querySelector('div.location').textContent;
    const icon = btn.querySelector('.save-this-location-icon');
    icon.classList.toggle('saved-location-icon');
    if (!icon.classList.contains('saved-location-icon')) removeSavedLocation(currentLocation);
    else saveLocation(currentLocation);
  });
};

export { initEventHandlersWithAsyncAwait };
