import React from "react";

// importing components
import Summary from "./components/summary";
import Feature from "./components/feature";


// importing styles
import "./style/App.css";
import "./style/summary.css";
import "./style/feature.css";

function App() {
  return (
    <div className="container flex">
      <Summary />
      <Feature />
    </div>
  );
}

export default App;

