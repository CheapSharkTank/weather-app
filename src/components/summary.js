import React from "react";
import WeatherICON from "./weatherICON";

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
    }
  }, [props.weather]);

  console.log(forecastData);

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
                <WeatherICON 
                key={index}
                condition_text = {data}
                />
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
                Highest temp 8 &deg;C
              </p>
              <p style={{ color: "#a4acd0", fontSize: "0.9rem" }}>
                Lowest temp -6 &deg;C
              </p>
            </div>

            <div className="dropdown">
              <button className="dropbtn">
                Today
                <span className="dropdown-icon">
                  <i className="fa-solid fa-caret-down"></i>
                </span>
              </button>
              <div className="dropdown-content" id="myDropdown">
                <a href="#">Item 1</a>
                <a href="#">Item 2</a>
                <a href="#">Item 3</a>
              </div>
            </div>
          </div>

          <div className="chart--body">
            <div className="forecast--chart">
              <table className="charts-css line show-labels hide-data">
                <caption>Weather Forecast Chart</caption>

                <tbody>
                  <tr>
                    <th scope="row">10 am</th>
                    <td style={{ "--start": "0.2", "--end": "0.5" }}>Data</td>
                  </tr>
                  <tr>
                    <th scope="row">11 am</th>
                    <td style={{ "--start": "0.5", "--end": "0.35" }}>Data</td>
                  </tr>
                  <tr>
                    <th scope="row">12 pm</th>
                    <td style={{ "--start": "0.35", "--end": "0.25" }}>Data</td>
                  </tr>
                  <tr>
                    <th scope="row">1 pm</th>
                    <td style={{ "--start": "0.25", "--end": "0.15" }}>Data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
