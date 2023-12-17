const forecastCardObj = ({ day, date, icon, description, temp, precip, humidity, vis, wind, uv }) => {
  return {
    type: 'div',
    attributes: { class: 'forecast-card' },
    children: [forecastCardHeader(day, date), forecastWeather(icon, description, temp, precip, humidity, vis, wind, uv)]
  };
};

const forecastCardHeader = (day, date) => {
  return {
    type: 'div',
    attributes: { class: 'forecast-card-header' },
    children: [
      {
        type: 'span',
        text: day,
        attributes: { class: 'forecast-day' }
      },
      {
        type: 'div',
        text: date,
        attributes: { class: 'forecast-date' }
      }
    ]
  };
};
const forecastWeather = (icon, description, temp, precip, humidity, vis, wind, uv) => {
  return {
    type: 'div',
    attributes: { class: 'forecast-card-weather' },
    children: [
      {
        type: 'div',
        attributes: { class: 'forecast-icon-description' },
        children: [
          {
            type: 'img',
            attributes: { class: 'forecast-icon', src: icon }
          },
          {
            type: 'div',
            text: description,
            attributes: { class: 'forecast-day-description' }
          }
        ]
      },
      {
        type: 'div',
        attributes: { class: 'forecast-card-label-values' },
        children: [
          cardInfoDiv(`Avg Temp:`, temp),
          cardInfoDiv(`Precipitation:`, precip),
          cardInfoDiv(`Max Humidity:`, humidity),
          cardInfoDiv(`Avg Visibility:`, vis),
          cardInfoDiv(`Max Wind:`, wind),
          cardInfoDiv(`UV:`, uv)
        ]
      }
    ]
  };
};

const cardInfoDiv = (text, value) => {
  return {
    type: 'div',
    text,
    attributes: { class: 'forecast-label' },
    children: [{ type: 'span', text: value, attributes: { class: 'forecast-value' } }]
  };
};

export { forecastCardObj };
