import { fetchWeatherAsyncAwait } from './apis/weatherAPI';
import { updateCurrentWeatherDisplay, updateForecastWeatherDisplay } from './ui';
import { userStorage } from './storage';

const updateLocationByGeoAsync = () => {
  toggleLoader(true);
  const userSettings = userStorage.getSettingsDataObj();
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const currentWeatherResponse = await fetchWeatherAsyncAwait(
          `${position.coords.latitude},${position.coords.longitude}`,
          'current'
        );
        const forecastWeatherResponse = await fetchWeatherAsyncAwait(
          `${position.coords.latitude},${position.coords.longitude}`,
          'forecast'
        );
        updateCurrentWeatherDisplay(currentWeatherResponse, userSettings);
        updateForecastWeatherDisplay(forecastWeatherResponse, userSettings);
        userStorage.storeCurrentWeather(currentWeatherResponse);
        userStorage.storeForecastWeather(forecastWeatherResponse);
      } catch (error) {
        console.error(error);
      }
    },
    async (onRejected) => {
      console.error(onRejected);
      try {
        const currentWeatherResponse = await fetchWeatherAsyncAwait('bald knob', 'current');
        const forecastWeatherResponse = await fetchWeatherAsyncAwait('bald knob', 'forecast');
        updateCurrentWeatherDisplay(currentWeatherResponse, userSettings);
        updateForecastWeatherDisplay(forecastWeatherResponse, userSettings);
        userStorage.storeCurrentWeather(currentWeatherResponse);
        userStorage.storeForecastWeather(forecastWeatherResponse);
      } catch (error) {
        console.error(error);
      }
    }
  );
  toggleLoader(false);
};

const updateLocationByInputAsync = async (location) => {
  toggleLoader(true);
  const userSettings = userStorage.getSettingsDataObj();
  try {
    const currentWeatherResponse = await fetchWeatherAsyncAwait(location, 'current');
    const forecastWeatherResponse = await fetchWeatherAsyncAwait(location, 'forecast');
    updateCurrentWeatherDisplay(currentWeatherResponse, userSettings);
    updateForecastWeatherDisplay(forecastWeatherResponse, userSettings);
    userStorage.storeCurrentWeather(currentWeatherResponse);
    userStorage.storeForecastWeather(forecastWeatherResponse);
  } catch (error) {
    console.error(error);
  }
  toggleLoader(false);
};

const toggleLoader = (state) => {
  const dialog = document.querySelector('.loader-dialog');
  if (state === true) dialog.showModal();
  else dialog.close();
};

export { updateLocationByGeoAsync, updateLocationByInputAsync };
