import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BiDroplet, BiSearch, BiWind } from "react-icons/bi";
import clearImg from "../assets/clear.png";
import cloudImg from "../assets/cloud.png";
import drizzleImg from "../assets/drizzle.png";
import rainImg from "../assets/rain.png";
import snowImg from "../assets/snow.png";
import Loading from "./Loading";

const WeatherApp = () => {
  const [searchCity, setSearchCity] = useState("naples");
  const [weather, setWeather] = useState(null);
  const [weatherImg, setWeatherImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_Key = "e831c1107f7bec1ac0d966dff99c6676";

  const fetchWeatherData = () => {
    setIsLoading(true);
    setError(null);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${api_Key}`
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(" città non trovata");
        }
      })
      .then((data) => {
        setWeather(data);
        setSearchCity("");
        setWeatherImg(getWeatherImg(data.weather[0].icon));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERRORE", error);
        setIsLoading(false);
        setError(error.message);
      });
  };

  //funzione per immagine meteo
  const getWeatherImg = (icon) => {
    switch (icon) {
      case "01d":
      case "01n":
        return clearImg;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        return cloudImg;
      case "04d":
      case "04n":
        return drizzleImg;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return rainImg;
      case "13d":
      case "13n":
        return snowImg;
      default:
        return "";
    }
  };

  // Funzione per convertire Kelvin in Celsius
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
  };

  return (
    <Container className="container-data">
      <div className="top-bar">
        <div>
          <input
            type="text"
            className="inputCity"
            placeholder="search"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          ></input>
        </div>
        <div className="btn-custom">
          <button
            onClick={fetchWeatherData}
            type="button"
            className="btn btn-primary "
          >
            <BiSearch className="icon-search" />
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            weather && (
              <>
                <div>
                  <img
                    src={weatherImg}
                    alt="icon-weather"
                    style={{ width: "200px" }}
                    className="weather-img"
                  />
                </div>
                <div className="temp-weather">
                  {weather.main.temp ? kelvinToCelsius(weather.main.temp) : ""}
                  °C
                </div>
                <div className="temp-min-max">
                  <div className="text">
                    MIN:{" "}
                    {weather.main.temp_min
                      ? kelvinToCelsius(weather.main.temp_min)
                      : ""}
                    °C
                  </div>
                  <div className="text">
                    MAX:{" "}
                    {weather.main.temp_max
                      ? kelvinToCelsius(weather.main.temp_max)
                      : ""}
                    °C
                  </div>
                </div>
                <div className="city">{weather.name}</div>
                <div className="data-container">
                  <div className="element">
                    <div className="icon">
                      <BiDroplet />
                    </div>
                    <div className="data">
                      <div>{weather.main.humidity} %</div>
                      <div className="text">umidity</div>
                    </div>
                  </div>
                  <div className="element">
                    <div className="icon">
                      <BiWind />
                    </div>
                    <div className="data">
                      <div>{weather.wind.speed} km/h</div>
                      <div className="text">wind</div>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </>
      )}
    </Container>
  );
};
export default WeatherApp;
