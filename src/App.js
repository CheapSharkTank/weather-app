import React from "react";

// importing components
import Summary from "./components/summary";
import Feature from "./components/feature";


// importing styles
import "./style/App.css";
import "./style/summary.css";
import "./style/feature.css";

// importing data from api
import { fetchDataFromBothAPIs } from "./apiData/getWeatherData";

async function fetchData() {
  const data = await fetchDataFromBothAPIs("Dhaka");
  console.log(data);
}
fetchData();


function App() {
  return (
    <div className="container flex">
      <Summary />
      <Feature />
    </div>
  );
}

export default App;

