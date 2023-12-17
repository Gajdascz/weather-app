# OdinEye Weather

OdinEye Weather is a dynamic web application that provides users with real-time weather updates and forecasts. This project was created as part of my journey through The Odin Project, providing me with invaluable hands-on experience and deepening my understanding of asynchronous programming and web API integration.

- **Live Preview**: https://gajdascz.github.io/weather-app/
- **Project Page**: [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-weather-app)

## Features

- Real-time weather data and forecasts using [WeatherAPI](https://www.weatherapi.com/docs/).
- Integration with the [GIPHY API](https://giphy.com/) to display a randomly generated (and hopefully relevant) GIF based on current weather conditions
- Interactive sidebar with unit toggles, location search, and saved locations.

## Learning Outcomes

- **Asynchronous JavaScript**: Enhanced understanding and application of JavaScript's promise-based features for asynchronous operations.
- **API Consumption**: Developed skills in utilizing the fetch API and managing CORS for third-party data retrieval and display.
- **Local Storage**: Implemented local storage for persisting user preferences and locations across sessions.
- **Modern JavaScript Practices**: Utilized ES6+ features for clean, modular, and maintainable code development.
- **Webpack & Version Control**: Increased experience in using Git and GitHub for version control and configuring Webpack for efficient asset bundling.

## Usage and Specifics

- **Weather Display:**
  - **Current Weather:**
    - **Header:**
      - `Star Icon`: Click to save and/or remove the current location from your saved locations.
      - `Location`: Name of current location and sate or country followed by the latest weather update time.
    - **Main Info:**
      - `Icon and Description`: Provides a visual representation and brief description of the current weather conditions.
      - `Temperature`: The current temperature.
      - `Feels Like`: Indicates the temperature as it feels to the human body, taking wind chill or humidity into account.
    - **Additional Info:**
      - `Gust`: Gust speed.
      - `Wind`: Wind speed.
      - `Direction`: Wind cardinal direction.
      - `Degree`: Wind Degree.
      - `UV`: Ultra-Violet index.
      - `Visibility`: Visible unobscured distance.
      - `Pressure`: Atmospheric pressure.
      - `Precipitation`: Total amount of precipitation.
      - `Clouds`: Total cloud coverage percentage.
- **Forecast:**
  - **Main Info:**
    - `Day and Date`: The day and date of the displayed weather forecast.
    - `Icon and Description`: An icon and short description of the forecasted weather.
    - `Avg Temperature`: The average temperature of the day.
    - `Precipitation`: Total amount of expected precipitation.
    - `Max Humidity`: The highest expected humidity percentage.
    - `Avg Visibility`: Visible unobscured distance.
    - `Max Wind`: The highest expected wind speed.
    - `UV`: Ultra-Violet index.

## Sidebar

- **Map Pin Button:** Gets your current location according to your browser.
- **Live Time:** Displays your locale time according to your browser.
- **Search Bar:** Enter a location and press the magnifying glass icon, or press the Enter key, to get that locations weather information.
- **Options:** All options are toggled by clicking the switch slider.
  - **Units:**
    - `°F °C`: Display temperature in degree Fahrenheit or degree Celsius.
    - `in mm`: Display measurement in inches or millimeters.
    - `in mb`: Display pressure in inches or millibars.
    - `mi km`: Display distance in miles or kilometers.
    - `mph kph`: Display speed in miles-per-hour or kilometers-per-hour.
  - **UI:**
    - `Gifs`: Toggle GIF display.
    - `BG`: Toggle changing background color display.
- **Saved Locations:** Displays all locations you have saved.
  - `-`: Click button containing the '-' (minus) operator to remove the saved location.
  - `Location Text`: Click the saved location text to display the saved location's weather information.

## Created With

- Core language: JavaScript
- Structuring: HTML5
- Styling: CSS3
- Module Bundling: Webpack
- APIs: [weatherAPI](https://www.weatherapi.com/docs/), [GIPHY](https://giphy.com/)

## Potential Updates

- Enhance UI for better responsiveness across various devices.
- Improve accessibility features for wider user compatibility.
- Expand weather information with additional data from APIs.

## Necessary Improvements

- **User Interface:** Focus on responsive design and improving accessibility.
- **Functionality:** Further documentation, refactoring, and improvement of modular design for easier scalability, management, and clarity.
