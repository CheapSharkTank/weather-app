import React, { useEffect, useState } from "react";

// importing components
import Summary from "./components/summary";
import Feature from "./components/feature";


// importing styles
import "./style/App.css";
import "./style/summary.css";
import "./style/feature.css";

// importing apiData
import { fetchDataFromAPIs } from "./apiData/getWeatherData";

function App() {
  const [query, setQuery] = React.useState("Dhaka");
  const [weather, setWeather] = React.useState(null);
  
  const [futureHoursData, setFutureHoursData] = useState([]);
  const [rainChances, setRainChances] = useState([]);



  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDataFromAPIs(query);
        console.log(data);
        setWeather(data); // Update weather state with fetched data
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    fetchData(); // Call the fetchData function when component mounts
  }, [query]);





   return (
    <div className="container flex">
      <Feature 
        weather = {weather}

        futureHoursData = {futureHoursData}
        setFutureHoursData = {setFutureHoursData}

        rainChances = {rainChances}
        setRainChances = {setRainChances}
      />

      <Summary 
        query = {query}
        setQuery = {setQuery}
        weather = {weather}

        futureHoursData = {futureHoursData}
        rainChances = {rainChances}
      />

    </div>
  );
}

export default App;

