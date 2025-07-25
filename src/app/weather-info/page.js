"use client";
import Image from "next/image";
import { useState } from "react";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherNight,
  TiWeatherPartlySunny,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindyCloudy,
} from "react-icons/ti";

const getCoordinates = async (city) => {
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=2497d1c0bfa8fca90fca131cd7e7e04c`
  );
  const geoData = await geoRes.json();
  return { lat: geoData[0].lat, lon: geoData[0].lon };
};

const getWeather = async (lat, lon) => {
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/1.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=2497d1c0bfa8fca90fca131cd7e7e04c`
  );
  const data = await weatherRes.json();
  return data;
};

// 🔥 ICON MAPPER FUNCTION
const getWeatherIcon = (condition) => {
  switch (condition) {
    case "Clear":
      return <TiWeatherSunny size={64} className="text-yellow-400" />;
    case "Clouds":
      return <TiWeatherCloudy size={64} className="text-gray-300" />;
    case "Rain":
      return <TiWeatherDownpour size={64} className="text-blue-400" />;
    case "Snow":
      return <TiWeatherSnow size={64} className="text-white" />;
    case "Thunderstorm":
      return <TiWeatherStormy size={64} className="text-purple-500" />;
    case "Drizzle":
      return <TiWeatherPartlySunny size={64} className="text-teal-300" />;
    case "Atmosphere":
      return <TiWeatherWindyCloudy size={64} className="text-gray-400" />;
    case "Night":
      return <TiWeatherNight size={64} className="text-indigo-700" />;
    default:
      return <TiWeatherPartlySunny size={64} className="text-gray-200" />;
  }
};

export default function WeatherInfo() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  return (
    <section className="flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-purple-600 text-3xl md:text-4xl font-bold text-center mb-10">
        🌦️ Weather App with React Icons
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-4xl bg-purple-950 shadow-xl rounded-xl p-6">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/assets/icons/weather-app.png"
            alt="Weather Icon"
            width={300}
            height={300}
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <input
            type="text"
            placeholder="Enter city..."
            className="w-full p-2 bg-purple-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-300"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (!city) return;
              try {
                // const { lat, lon } = await getCoordinates(city);
                const weatherData = await getWeather(lat, lon);
                setData(weatherData);
              } catch (err) {
                alert(
                  "❌ Failed to fetch weather, May be Api Key subscription limit reached or invalid city name"
                );
              }
            }}
            className="mt-3 bg-purple-600 px-4 py-2 rounded text-gray-300 hover:bg-purple-700 transition"
          >
            Get Weather
          </button>

          {data && (
            <div className="mt-6 text-center text-purple-300">
              <div className="flex justify-center mb-2">
                {getWeatherIcon(data.current.weather[0].main)}
              </div>
              <h2 className="text-xl font-bold">📍 {city}</h2>
              <p className="text-2xl">🌡️ {data.current.temp}°C</p>
              <p>☁️ {data.current.weather[0].description}</p>
              <p>💧 Humidity: {data.current.humidity}%</p>
              <p>💨 Wind: {data.current.wind_speed} m/s</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
