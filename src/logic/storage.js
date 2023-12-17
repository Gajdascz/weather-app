const userStorage = (() => {
  const storeSettings = (settingsObj) => localStorage.setItem('settings', serializeData(settingsObj));
  const storeCurrentWeather = (currentWeatherObj) => localStorage.setItem('current', serializeData(currentWeatherObj));
  const storeForecastWeather = (forecastWeatherObj) =>
    localStorage.setItem('forecast', serializeData(forecastWeatherObj));

  const getSettingsDataObj = () => deserializeData(localStorage.getItem('settings'));
  const getCurrentWeatherDataObj = () => deserializeData(localStorage.getItem('current'));
  const getForecastWeatherDataObj = () => deserializeData(localStorage.getItem('forecast'));

  const serializeData = (dataObj) => JSON.stringify(dataObj);
  const deserializeData = (serializedData) => JSON.parse(serializedData);

  const isSavedSettings = () => !!localStorage.getItem('settings');

  return {
    storeSettings,
    storeCurrentWeather,
    storeForecastWeather,
    getSettingsDataObj,
    getCurrentWeatherDataObj,
    getForecastWeatherDataObj,
    isSavedSettings,
    get length() {
      return localStorage.length;
    }
  };
})();

export { userStorage };
