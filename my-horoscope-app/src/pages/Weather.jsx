import { useState } from 'react';

function Weather() {
  const [city, setCity] = useState(''); 
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cities = ['Sapporo', 'Tokyo', 'Osaka']; 

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const apiKey = 'bb6e428a3798eec0b27079a619986ae4';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Unknow City (error code: ${res.status})`);
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Weathercast</h2>

      <label htmlFor="city-input">Write a City name:</label>
      <input
        id="city-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="For ex., Tokyo"
      />

      <button onClick={fetchWeather}>Check a weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && !loading && (
        <div>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>humide: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/sec</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
