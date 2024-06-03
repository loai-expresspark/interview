import React, { useState, useEffect } from 'react';

function WeatherApp() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather();
  };

  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location]);

  return (
    <div>
      <input type="text" value={location} onChange={handleInputChange} placeholder="Enter location" />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <div>
          <h1>{weather.name}</h1>
          <p>{weather.weather[0].description}</p>
          <p>{(weather.main.temp - 273.15).toFixed(2)}°C</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
