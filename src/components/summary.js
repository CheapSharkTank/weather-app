import React from "react";
import WeatherICON from "./weatherICON";
import Chart from "./chart";

function dateDay(dates) {
  // Array of weekday names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Function to get the day of the week for a given date
  const getWeekday = (date) => {
    const inputDate = new Date(date);
    const dayIndex = inputDate.getDay();
    return daysOfWeek[dayIndex];
  };

  // Map each date to its corresponding weekday
  return dates.map(getWeekday);
}

function Summary(props) {
  const [searchInput, setSearchInput] = React.useState("");
  const [currentMinMax, setCurrentMinMax] = React.useState({
    max: "",
    min: ""
  })

  const handleInputChange = React.useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter") {
        setSearchInput("");
        props.setQuery(e.target.value);
        console.log(e.target.value);
      }
    },
    [props.setQuery, searchInput]
  );

  // //////////////////////////////////////////////
  const [forecastData, setForecastData] = React.useState({
    day: [],
    maxtemp_c: [],
    mintemp_c: [],
    avgtemp_c: [],
    daily_chance_of_rain: [],
    condition_text: [],
  });

  const updateForecastData = (forecast) => {
    setForecastData((prevState) => ({
      ...prevState,
      day: dateDay(forecast.slice(1).map((item) => item.date)),
      maxtemp_c: forecast.slice(1).map((item) => Math.ceil(item.day.maxtemp_c)),
      mintemp_c: forecast.slice(1).map((item) => Math.ceil(item.day.mintemp_c)),
      avgtemp_c: forecast.slice(1).map((item) => Math.ceil(item.day.avgtemp_c)),
      daily_chance_of_rain: forecast
        .slice(1)
        .map((item) => item.day.daily_chance_of_rain),
      condition_text: forecast.slice(1).map((item) => item.day.condition.text),
    }));
  };

  React.useEffect(() => {
    if (props.weather) {
      updateForecastData(props.weather.fourDayForecast);
      setCurrentMinMax({
        max : props.weather.openWeatherData.main.temp_max.toFixed(),
        min : props.weather.openWeatherData.main.temp_min.toFixed()
      })
    
    }
  }, [props.weather]);


  return (
    <div className="summary">
      <div className="wrapper flex">
        <div className="app flex">
          <p className="app--title">Weather Forecast</p>

          <div className="search-box">
            <button className="btn-search">
              <i className="fas fa-search"></i>
            </button>

            <input
              type="text"
              className="input-search"
              placeholder="search for city..."
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="tabset flex">
          <div className="forecast--wrapper flex">
            <div className="days_container flex">
              {forecastData.day.map((day, index) => (
                <p className="days" key={index}>
                  {day}
                </p>
              ))}
            </div>

            <div className="rain_percent">
              <div className="percent_container flex">
                {forecastData.daily_chance_of_rain.map((data, index) => (
                  <p key={index}>
                    <span>
                      <i className="fa-solid fa-droplet"></i>
                    </span>{" "}
                    {data}
                    {"%"}
                  </p>
                ))}
              </div>
            </div>

            <div className="weather_icon_container flex">
              {forecastData.condition_text.map((data, index) => (
                <WeatherICON key={index} condition_text={data} />
              ))}
            </div>

            <div className="temp_container flex">
              {forecastData.mintemp_c.map((data, index) => {
                // Ratio between high and low temp
                const ratio = data / forecastData.maxtemp_c[index];
                return (
                  <div key={index} className="high_low_temp flex">
                    <p>{data}&deg;C</p>
                    <div className="bar flex">
                      <div
                        className="low_temp"
                        style={{ width: `${ratio * 100}%` }}
                      ></div>
                      <div
                        className="high_temp"
                        style={{ width: `${(1 - ratio) * 100}%` }}
                      ></div>
                    </div>
                    <p>{forecastData.maxtemp_c[index]}&deg;C</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="weather--chart flex">
          <div className="chart--header flex">
            <p style={{ fontWeight: "600" }}>Weather</p>

            <div className="flex" style={{ gap: "2rem" }}>
              <p style={{ color: "#9fb77b", fontSize: "0.9rem" }}>
                Highest temp {currentMinMax.max}&deg;C
              </p>
              <p style={{ color: "#a4acd0", fontSize: "0.9rem" }}>
                Lowest temp {currentMinMax.min}&deg;C
              </p>
            </div>

              
            <p>Today</p>
          </div>

          <div className="chart--body">
            <Chart
              futureHoursData = {props.futureHoursData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
