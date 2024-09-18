import React, { useState, useEffect } from "react";
import "./App.css";
import Thunder from "./assets/thunder.png";

const App = () => {
  const [city, setCity] = useState("New Delhi");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentDate = new Date();

  // Format the date as "MMM DD, YYYY"
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const API_KEY = "82a78100abe19654602a5414c460e1e2";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  

  const changeCity = (e) => {
    setCity(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="container-data">{formattedDate}</h1>
      {error && <p>{error}</p>}
      {weather && (
        <>
          <div className="weather-data">
            <h2 className="container-city">{weather.name}</h2>
            {loading && <p>Loading...</p>}
            <img
              className="container-img"
              src={Thunder}
              width="180px"
              alt="thunder"
            />
            <h2 className="container-degree">{weather.main.temp}°C</h2>
            <h2 className="container-per">{weather.weather[0].description}</h2>
          </div>
        </>
      )}
      <form  onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter the city"
          value={city}
          onChange={changeCity}
        />
        <button type="submit">Get</button>
      </form>
    </div>
  );
};

export default App;
