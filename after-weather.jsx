import React, { useState } from 'react';
import useWeather from './useWeather';
import WeatherDisplay from './WeatherDisplay';
import WeatherForm from './WeatherForm';

function WeatherApp() {
  const [location, setLocation] = useState('');
  const { weather, loading, error } = useWeather(location);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };


  return (
    <div>
      <WeatherForm
        location={location}
        onLocationChange={handleInputChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default WeatherApp;
