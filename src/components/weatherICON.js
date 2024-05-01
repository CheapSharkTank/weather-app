import React from "react";

export default function WeatherICON({ condition_text }) {
  // Map condition text to corresponding Bootstrap icon class
  const getWeatherIconClass = (text) => {
    const lowerCaseCondition = text.toLowerCase();
    const iconMap = {
      'clear': 'bi bi-brightness-high',
      'sunny': 'bi bi-brightness-high',
      'cloudy': 'bi bi-cloud',
      'rain': 'bi bi-cloud-rain',
      'moderate rain': 'bi bi-cloud-rain',
      'patchy rain nearby': 'bi bi-cloud-rain',
      'snow': 'bi bi-snow',
      'heat': 'bi bi-thermometer-sun',
      'extreme': 'bi bi-thermometer-sun',
      'cold': 'bi bi-thermometer-snow',
      'smog': 'fa-solid fa-smog',
      'haze': 'bi bi-cloud-fog',
      'cloud haze' : 'bi bi-cloud-haze2',
      'hail': 'bi bi-cloud-hail',
      'lightning': 'bi bi-lightning',
      'moon': 'bi bi-moon-stars',
      'stars': 'bi bi-moon-stars',
      'rainbow': 'bi bi-rainbow',
      'strong': 'bi bi-hurricane',
      'hurricane': 'bi bi-hurricane',
      "tornado" : "bi bi-tornado",
      "storm" : "bi bi-tropical-storm"
      // ADD MORE IF YOU CAN
    };
    // Check if the condition text matches any key in the iconMap
    // If not, return 'bi-question', otherwise return the corresponding icon class
    return iconMap[lowerCaseCondition] || 'bi-question';
  };

  return (
    <div>
      <span><i className={`${getWeatherIconClass(condition_text)}`}></i></span>
    </div>
  );
}
