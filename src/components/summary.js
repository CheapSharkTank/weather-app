import React from "react";

function Summary() {
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
            />
          </div>
        </div>

        <div className="tabset">
          <input
            type="radio"
            name="tabset"
            id="tab1"
            aria-controls="week"
            checked
          />
          <label for="tab1">Week</label>
          <input type="radio" name="tabset" id="tab2" aria-controls="month" />
          <label for="tab2">Month</label>

          <input
            type="radio"
            name="tabset"
            id="tab3"
            aria-controls="3-months"
          />
          <label for="tab3">3 Months</label>

          <div className="tab-panels">
            <section id="week" className="tab-panel">
              <div className="forecast--container flex">
                <div className="forecast--wrapper flex">
                  <div className="days">Sunday</div>
                  <div className="rain_percent">54%</div>
                  <div className="weather_icon_forecast">Weather Icon</div>
                  <div className="high_low_temp flex">
                    <p>15&deg;C</p>
                    <div className="bar flex">
                      <div
                        className="low_temp"
                        style={{ width: "120px" }}
                      ></div>
                      <div
                        className="high_temp"
                        style={{ width: "50px" }}
                      ></div>
                    </div>
                    <p>19&deg;C</p>
                  </div>
                </div>
                <div className="forecast--wrapper flex">
                  <div className="days">Sunday</div>
                  <div className="rain_percent">54%</div>
                  <div className="weather_icon_forecast">Weather Icon</div>
                  <div className="high_low_temp flex">
                    <p>15&deg;C</p>
                    <div className="bar flex">
                      <div
                        className="low_temp"
                        style={{ width: "120px" }}
                      ></div>
                      <div
                        className="high_temp"
                        style={{ width: "50px" }}
                      ></div>
                    </div>
                    <p>19&deg;C</p>
                  </div>
                </div>
                <div className="forecast--wrapper flex">
                  <div className="days">Sunday</div>
                  <div className="rain_percent">54%</div>
                  <div className="weather_icon_forecast">Weather Icon</div>
                  <div className="high_low_temp flex">
                    <p>15&deg;C</p>
                    <div className="bar flex">
                      <div
                        className="low_temp"
                        style={{ width: "120px" }}
                      ></div>
                      <div
                        className="high_temp"
                        style={{ width: "50px" }}
                      ></div>
                    </div>
                    <p>19&deg;C</p>
                  </div>
                </div>
                <div className="forecast--wrapper flex">
                  <div className="days">Sunday</div>
                  <div className="rain_percent">54%</div>
                  <div className="weather_icon_forecast">Weather Icon</div>
                  <div className="high_low_temp flex">
                    <p>15&deg;C</p>
                    <div className="bar flex">
                      <div
                        className="low_temp"
                        style={{ width: "120px" }}
                      ></div>
                      <div
                        className="high_temp"
                        style={{ width: "50px" }}
                      ></div>
                    </div>
                    <p>19&deg;C</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="month" className="tab-panel">
              <h2>Monthly Forecast</h2>
            </section>

            <section id="3-months" className="tab-panel">
              <h2>3 Month Forecast</h2>
            </section>
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
              <button className="dropbtn" onclick="toggleDropdown()">
                Today
                <span className="dropdown-icon">
                  <i className="fa-solid fa-caret-down"></i>
                </span>
              </button>
              <div className="dropdown-content" id="myDropdown">
                <a href="#" onclick="selectItem('Item 1')">
                  Item 1
                </a>
                <a href="#" onclick="selectItem('Item 2')">
                  Item 2
                </a>
                <a href="#" onclick="selectItem('Item 3')">
                  Item 3
                </a>
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
