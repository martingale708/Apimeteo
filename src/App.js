import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = '4597a3c583602ba02dc726440a45e28c'; // Remplace avec ta clé API

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo', error);
    }
  };

  return (
    <div>
      <h1>Application de Météo</h1>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Entrez une ville"
        />
        <button type="submit">Rechercher</button>
      </form>

      {weather && (
        <div>
          <h2>Météo à {weather.name}</h2>
          <p>Température : {weather.main.temp}°C</p>
          <p>Humidité : {weather.main.humidity}%</p>
          <p>Description : {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
