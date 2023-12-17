import { fetchGIFAsyncAwait } from './apis/gipyhAPI';
import { forecastCardObj } from './forecastCard';
import { buildElementTree } from '../utility/elementObjBuilder';

function updateCurrentWeatherDisplay(data, settings = {}) {
  const current = data.current;
  const sec = document.querySelector('section.current-weather');
  const savedIcon = sec.querySelector('.save-this-location-icon');
  let locationString;
  if (data.location.region !== '' && data.location.region !== data.location.name) {
    locationString = `${data.location.name}, ${data.location.region}`;
  } else {
    locationString = `${data.location.name}, ${data.location.country}`;
  }

  const isLocationSaved = () => settings.savedLocations.some((location) => location === locationString);

  const setText = (selector, value) => {
    sec.querySelector(selector).textContent = value;
  };
  const getValue = (apiProperty, unit) => current[`${apiProperty}_${settings[unit]}`] + `${settings[unit]}`;

  const updateHeader = () => {
    const updatedString = `updated on ${current.last_updated}`;
    setText('.location', locationString);
    setText('.last-updated', updatedString);
  };

  const updatePrimary = async () => {
    const imgElement = sec.querySelector('.current-weather-gif');
    const queryDiv = sec.querySelector('.gif-query');
    const icon = sec.querySelector('.current-weather-icon');
    icon.src = getIcon(data.current.condition.icon);
    let query;
    if (settings.gifs === 'on' || settings.bg === 'on') query = checkWeatherCondition(data);
    if (settings.gifs === 'on') {
      imgElement.classList.remove('hidden');
      imgElement.src = await getGif(query);
      queryDiv.classList.remove('hidden');
      queryDiv.querySelector('.search-query').textContent = ` ${query}`;
    } else {
      imgElement.classList.add('hidden');
      imgElement.src = '';
      queryDiv.classList.add('hidden');
      queryDiv.querySelector('.search-query').textContent = '';
    }
    if (settings.bg === 'on') setBG(query);
    else setBG('off');
    setText('.current-weather-description', current.condition.text);
    setText('.current-weather-temp', current[`temp_${settings.temp}`] + `°${settings.temp.toUpperCase()}`);
    setText('.current-feels-like-temp', current[`feelslike_${settings.temp}`] + `°${settings.temp.toUpperCase()}`);
  };

  const updateWind = () => {
    setText('.current-gust-speed', getValue('gust', 'speed'));
    setText('.current-wind-speed', getValue('wind', 'speed'));
    setText('.current-wind-degree', current.wind_degree);
    setText('.current-wind-direction', current.wind_dir);
  };

  const updateOther = () => {
    setText('.current-uv', current.uv);
    setText('.current-humidity', current.humidity + '%');
    setText('.current-visibility', getValue('vis', 'distance'));
    setText('.current-pressure', getValue('pressure', 'pressure'));
    setText('.current-precip-amount', getValue('precip', 'precip'));
    setText('.current-cloud-coverage', data.current.cloud + '%');
  };
  updateHeader();
  updatePrimary();
  updateWind();
  updateOther();

  if (isLocationSaved()) savedIcon.classList.add('saved-location-icon');
  else savedIcon.classList.remove('saved-location-icon');
}

const getGif = async (query) => {
  try {
    const response = await fetchGIFAsyncAwait(query);
    if (response.data.length > 0)
      return response.data[Math.floor(response.data.length * Math.random())].images.original.url;
    else return null;
  } catch (error) {
    console.error(error);
  }
};
const checkWeatherCondition = (data) => {
  const snowRegEx = /^snow$/i;
  const rainRegEx = /^rain$/i;
  const fogRegEx = /^fog|mist$/i;
  const cloudRegEx = /^cloud|cloudy$/i;
  const conditionText = data.current.condition.text.toLowerCase();
  let query;
  if (conditionText === 'blizzard') query = 'blizzard';
  else if (data.current.gust_mph >= 20 && data.current.precip_mm > 0) query = 'storm';
  else if (snowRegEx.test(conditionText)) query = 'snow';
  else if (rainRegEx.test(conditionText)) query = 'rain';
  else if (data.current.gust_mph >= 20) query = 'windy';
  else if (fogRegEx.test(conditionText)) query = 'fog';
  else if (data.current.temp_f <= 40) query = 'cold';
  else if (data.current.temp_f >= 80) query = 'hot';
  else if (data.current.humidity >= 80) query = 'humid';
  else if (data.current.cloud >= 55) query = 'clouds';
  else if (cloudRegEx.test(conditionText)) query = 'clouds';
  else if (conditionText === 'sunny') query = 'sunny';
  else if (conditionText === 'clear' && data.current.is_day) query = 'sun';
  else if (conditionText === 'clear' && !data.current.is_day) query = 'moon';
  else query = 'who knows';

  return query;
};
const setBG = (query) => {
  const main = document.querySelector('main');
  if (query === 'off') main.id = '';
  else if (query === 'blizzard' || query === 'storm') main.id = 'stormy';
  else if (query === 'snow') main.id = 'snowy';
  else if (query === 'windy') main.id = 'windy';
  else if (query === 'fog') main.id = 'foggy';
  else if (query === 'hot' || query === 'sun' || query === 'sunny') main.id = 'sunny';
  else if (query === 'clouds') main.id = 'cloudy';
  else if (query === 'cold') main.id = 'cold';
  else if (query === 'moon') main.id = 'moon';
};

function updateForecastWeatherDisplay(responseData, settings) {
  const forecast = responseData.forecast.forecastday;
  const sec = document.querySelector('section.forecast');
  const currentCards = sec.querySelectorAll('.forecast-card');
  [...currentCards].forEach((card) => card.remove());
  forecast.forEach((day) => {
    const apiDate = day.date;
    const apiDay = day.day;
    const year = apiDate.slice(0, 4);
    const month = apiDate.slice(5, 7);
    const date = apiDate.slice(8, 10);
    const actualDate = new Date(year, month, date);
    const cardObj = forecastCardObj({
      day: getDayName(actualDate.getDay()),
      date: apiDate,
      icon: getIcon(apiDay.condition.icon),
      description: apiDay.condition.text,
      temp: apiDay[`avgtemp_${settings.temp}`] + `°${settings.temp.toUpperCase()}`,
      precip: apiDay[`totalprecip_${settings.precip}`] + `${settings.precip}`,
      humidity: apiDay.avghumidity + '%',
      vis: apiDay[`avgvis_${settings.distance}`] + `${settings.distance}`,
      wind: apiDay[`maxwind_${settings.speed}`] + `${settings.speed}`,
      uv: apiDay.uv
    });

    const cardElement = buildElementTree(cardObj);
    sec.append(cardElement);
  });
}

const getIcon = (apiPath) => {
  const apiIconPath = apiPath;
  const sliceAfter = '64x64/';
  const sliceIndex = apiIconPath.indexOf(sliceAfter) + sliceAfter.length;
  return 'assets/weather-icons/' + `${apiIconPath.slice(sliceIndex)}`;
};

const getDayName = (dayNumber) => {
  switch (dayNumber) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
};

const refreshDisplay = (current, forecast, settings) => {
  updateCurrentWeatherDisplay(current, settings);
  updateForecastWeatherDisplay(forecast, settings);
};

export { updateCurrentWeatherDisplay, updateForecastWeatherDisplay, refreshDisplay };
