import React from 'react'

function Feature() {
  return (
    <div className="feature flex">
        
    <div className="day flex">
      <div className="day_weather-icon">Icon</div>
      
      <div className="day_date">
        <p style={{fontSize: "1.2rem"}}>Today</p>
        <p style={{fontSize: "0.7rem"}}>Fri, 11 Nov</p>
      </div>
    </div>

    <div className="current_temp flex">
      <p className="temp flex">29 <span className="metric text-muted">&deg;C</span></p>
      <p className="place text-muted">Delhi, India</p>

      <div className="flex" style={{gap: "0.5rem"}}>
        <p className="text-muted">Feels like 32</p>
        <p>&#x2022;</p>
        <p className="text-muted">Sunset 18.15</p>
      </div>


    </div>

    
  </div>
  )
}

export default Feature
