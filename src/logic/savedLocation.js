import { userStorage } from './storage';
import { buildElementTree } from '../utility/elementObjBuilder';
import { updateLocationByInputAsync } from './updateLocation';

function removeSavedLocation(location) {
  const savedLocationsContainer = document.querySelector('.saved-locations');
  const savedLocations = savedLocationsContainer.querySelectorAll('.saved-location');
  const userSettings = userStorage.getSettingsDataObj();
  const locationElement = [...savedLocations].find(
    (element) => element.querySelector('button.load-saved-location').dataset.location === location
  );
  locationElement?.remove();
  const index = userSettings.savedLocations.indexOf(location);
  if (index > -1) userSettings.savedLocations.splice(index, 1);
  userStorage.storeSettings(userSettings);
}

function saveLocation(location) {
  const userSettings = userStorage.getSettingsDataObj();
  const savedLocationsContainer = document.querySelector('.saved-locations');
  userSettings.savedLocations.push(location);
  savedLocationsContainer.append(buildLocationElement(location));
  userStorage.storeSettings(userSettings);
}

const buildLocationElement = (location) => buildElementTree(savedLocationObj(location));

const initSavedLocations = () => {
  const userSettings = userStorage.getSettingsDataObj();
  const savedLocationsContainer = document.querySelector('.saved-locations');
  userSettings.savedLocations.forEach((location) => {
    const locationObj = savedLocationObj(location);
    const locationElement = buildElementTree(locationObj);
    savedLocationsContainer.append(locationElement);
  });
};

const savedLocationObj = (location) => {
  return {
    type: 'div',
    attributes: { class: 'saved-location' },
    children: [
      {
        type: 'button',
        text: '-',
        attributes: { class: 'remove-saved-location', 'data-location': location },
        listeners: {
          click: function (e) {
            const currentLocation = document.querySelector('div.location').textContent;
            if (this.dataset.location === currentLocation) {
              document.querySelector('.save-this-location-icon').classList.remove('saved-location-icon');
            }
            removeSavedLocation(this.dataset.location);
          }
        }
      },
      {
        type: 'button',
        text: location,
        attributes: { class: 'load-saved-location', 'data-location': location },
        listeners: {
          click: function (e) {
            this.addEventListener('click', function (e) {
              updateLocationByInputAsync(this.dataset.location);
            });
          }
        }
      }
    ]
  };
};

export { saveLocation, removeSavedLocation, initSavedLocations };
