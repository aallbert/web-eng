"use client"
import WeatherApiHandler from '../api/weather/weatherApiHandler';
import React, { useState } from 'react';
import "../globals.css"
import WeatherDataExtractor, { forecast, WeatherData } from '../api/weather/weatherDataExtractor';


const Weather: React.FC = () => {
  const [city, setCity] = useState<string>(''); // Input city
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Weather data
  const [error, setError] = useState<string>(''); // Error handling

  return (
    <div >
      <h2>Wetterdaten Anzeige</h2>
      <input
        type="text"
        placeholder="Stadt eingeben"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCity(e.target.value)
        }
      />
      <button onClick={async () =>{
        const apiResponse: Object = await WeatherApiHandler.getWeather(city);
        const weatherData = WeatherDataExtractor.extractWeather(apiResponse);
        setWeatherData(weatherData);
        }
        
        } >
        Wetter abrufen
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
  <div style={{ marginTop: "20px" }}>
    <h3>{weatherData.city} - 5 Tage Wetter</h3>
    {weatherData.forecasts.map((item: forecast, index: number) => (
      <div key={index} style={{ marginBottom: "10px" }}>
        <strong>Zeipunkt: {item.time.toString() }</strong>
        <p>Temperatur: {item.temperature}°C</p>
        <p>Wetter: {item.description}</p>
        <p>Luftfeuchtigkeit: {item.humidity}%</p>
        <p>Windgeschwindigkeit: {item.windSpeed} m/s</p>
        
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default Weather;
