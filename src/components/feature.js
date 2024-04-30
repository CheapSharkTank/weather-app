import React from "react";

function Feature(props) {
  const [weatherState, setWeatherState] = React.useState({
    temp: "",
    place: "Dhaka, Bangladesh",
    feelLike: null,
    time: "",
    wind: "",
    humidity: "",
    pressureIn: "",
  });

  const [futureHoursData, setFutureHoursData] = React.useState([]);
  const [rainChances, setRainChances] = React.useState([]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour > 12 ? hour - 12 : hour}:${
      minute < 10 ? "0" : ""
    }${minute} ${hour >= 12 ? "PM" : "AM"}`;
  };

  const updateWeatherState = (weatherData) => {
    const currentTime = new Date().getTime() / 1000;
    const sunriseTime = weatherData.openWeatherData.sys.sunrise;
    const sunsetTime = weatherData.openWeatherData.sys.sunset;

    setWeatherState({
      temp: weatherData.openWeatherData.main.temp.toFixed(),
      feelLike: weatherData.openWeatherData.main.feels_like.toFixed(),
      time:
        currentTime < sunriseTime || currentTime > sunsetTime
          ? `Sunrise ${formatTime(sunriseTime)}`
          : `Sunset ${formatTime(sunsetTime)}`,
      wind: weatherData.openWeatherData.wind.speed.toFixed() + "km/h",
      place: weatherData.weatherAPIData.location.name ?? "Dhaka, Bangladesh",
      humidity: weatherData.weatherAPIData.current.humidity + "%",
      pressureIn:
        weatherData.weatherAPIData.current.pressure_in.toFixed(1) + "pa",
    });
  };

  React.useEffect(() => {
    if (props.weather) {
      updateWeatherState(props.weather);
    }
  }, [props.weather]);

  // CHANCES OF RAINS
  React.useEffect(() => {
    const currentHour = new Date().getHours();
    if (props.weather && props.weather.hourlyForecast) {
      const filteredData = props.weather.hourlyForecast
        .filter(hourData => {
          const hour = new Date(hourData.time).getHours();
          return hour > currentHour;
        })
        .slice(0, 4); // Limit to 4 values or less
      setFutureHoursData(filteredData);
    }
  }, [props.weather]);
  
  React.useEffect(() => {
    if (futureHoursData.length > 0) {
      const chances = futureHoursData.map((hourData) => ({
        time: formatTimeHourly(hourData.time),
        chanceOfRain: hourData.chance_of_rain,
      }));
      setRainChances(chances);
    }
  }, [futureHoursData]);
  
  // Function to format time to 12-hour format
  const formatTimeHourly = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours() % 12 || 12; // Convert 0 to 12 for midnight
    const period = date.getHours() < 12 ? "AM" : "PM";
    return `${hours}${period.toLowerCase()}`; // Remove the space and convert to lowercase
  };

  return (
    <div className="feature flex">
      <div className="day flex">
        <div className="day_weather-icon">Icon</div>

        <div className="day_date">
          <p style={{ fontSize: "1.2rem" }}>Today</p>
          <p style={{ fontSize: "0.7rem" }}>{weatherState.currentDate}</p>
        </div>
      </div>

      <div className="current_temp flex">
        <p className="temp flex">
          {weatherState.temp ? `${weatherState.temp}` : "N/A"}{" "}
          <span className="metric text-muted">&deg;C</span>
        </p>
        <p className="place text-muted">
          {weatherState.place
            ? `${weatherState.place}`
            : "Identifying location"}
        </p>

        <div className="flex" style={{ gap: "0.5rem" }}>
          <p className="text-muted">
            Feels like{" "}
            {weatherState.feelLike ? `${weatherState.feelLike}` : "N/A"}
          </p>
          <p>&#x2022;</p>
          <p className="text-muted">
            {weatherState.time ? `${weatherState.time}` : "...."}
          </p>
        </div>
      </div>

      <div className="details flex">
        <div className="wind flex">
          <div className="wind_speed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-cloud-haze2"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 3a4 4 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 12H4.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 3M0 7.5A.5.5 0 0 1 .5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m2 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-2 4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
            </svg>
          </div>
          <p style={{ fontSize: "1rem" }}>
            {weatherState.wind ? `${weatherState.wind}` : "...."}
          </p>
        </div>

        <div className="rain flex">
          <div className="rain_speed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-moisture"
              viewBox="0 0 16 16"
            >
              <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
            </svg>
          </div>
          <p style={{ fontSize: "1rem" }}>
            {weatherState.humidity ? `${weatherState.humidity}` : "...."}
          </p>
        </div>

        <div className="pressure flex">
          <div className="pressure_speed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-water"
              viewBox="0 0 16 16"
            >
              <path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65" />
            </svg>
          </div>
          <p style={{ fontSize: "1rem" }}>
            {weatherState.pressureIn ? `${weatherState.pressureIn}` : "...."}
          </p>
        </div>
      </div>

      {/* Chances of rain */}

      <div className="rain--chances flex">
        <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
          {" "}
          Chance of Rain
        </p>

        <div className="rain--chart grid">
          <div className="category flex">
            <p>heavy rain</p>
            <p>rainy</p>
            <p>sunny</p>
          </div>

          <div className="percent--chart flex">
            {rainChances.map((chance, index) => (
              <div className="stick--container flex" key={index}>
                <p className="rain--percent">{chance.chanceOfRain}%</p>
                <div
                  className="stick"
                  style={{
                    height:
                      chance.chanceOfRain === 0
                        ? "10px"
                        : `${chance.chanceOfRain}px`,
                    backgroundColor:
                      chance.chanceOfRain > 20 ? "#2d2e62" : "#eab90d",
                  }}
                ></div>
                <p className="time--stamp">{chance.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
