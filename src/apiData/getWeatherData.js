import { openWeatherApi, weatherApi } from "./APIs";


// Open Weather API --- Fetches only current weather data
async function fetchDataFromOpenWeatherApi(cityName) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApi}&units=metric`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from OpenWeather API:", error);
    return null;
  }
}
// Weather API --- Fetches only current weather data
async function fetchDataFromWeatherAPI(cityName) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherApi}&q=${cityName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Weather API:", error);
    return null;
  }
}
// Weather API --- Fetches only current hourly weather data
async function fetchHourlyForecastFromWeatherAPI(cityName) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApi}&q=${cityName}&days=1&aqi=no&alerts=no`);
    const data = await response.json();
    return data.forecast.forecastday[0].hour;
  } catch (error) {
    console.error("Error fetching hourly forecast data from Weather API:", error);
    return null;
  }
}
// Weather API --- Fetches only 4 day weather data
async function fetchFourDayForecastFromWeatherAPI(cityName) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApi}&q=${cityName}&days=5&aqi=no&alerts=no`);
    const data = await response.json();
    return data.forecast.forecastday;
  } catch (error) {
    console.error("Error fetching 4-day forecast data from Weather API:", error);
    return null;
  }
}

export async function fetchDataFromAPIs(cityName) {
  try {
    const [openWeatherData, weatherAPIData, hourlyForecast, fourDayForecast] = await Promise.all([
      fetchDataFromOpenWeatherApi(cityName),
      fetchDataFromWeatherAPI(cityName),
      fetchHourlyForecastFromWeatherAPI(cityName),
      fetchFourDayForecastFromWeatherAPI(cityName)
    ]);
    return { openWeatherData, weatherAPIData, hourlyForecast, fourDayForecast };
  } catch (error) {
    console.error("Error fetching data from both APIs:", error);
    return null;
  }
}
