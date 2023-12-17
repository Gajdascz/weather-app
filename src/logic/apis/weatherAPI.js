const e = 'bb5d2';
const n = '8aa208';
const i = 'a472b8';
const g = '712250';
const m = '592311';
const a = '12';
const URL = 'https://api.weatherapi.com/v1';

const buildRequestURL = (location, type) =>
  type === 'current'
    ? `${URL}/${type}.json?key=${e + n + i + g + m + a}&q=${location}`
    : `${URL}/${type}.json?key=${e + n + i + g + m + a}&q=${location}&days=3`;

async function fetchWeatherAsyncAwait(location, type) {
  const request = buildRequestURL(location, type);
  try {
    const response = await fetch(request, { mode: 'cors' });
    if (!response.ok) throw new Error('Network Response Error.');
    return await response.json();
  } catch (error) {
    throw new Error(`Fetch Error: ${error}`);
  }
}

export { fetchWeatherAsyncAwait };
