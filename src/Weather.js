import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState({});

  function displayWeather(response) {
    console.log(response.data);
    setLoaded(true);
    setInfo({
      name: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0dc40d3d7cda209ca40e77430c74cf57&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  let searchForm = (
    <div className="Weather mt-5 rounded">
      <form className="input-group mt-1 mb-5 " onSubmit={handleSubmit}>
        <input
          onChange={showCity}
          type="text"
          className="form-control"
          placeholder="Type a city"
          aria-label="name of citiy"
          aria-describedby="button-addon2"
        />
        <button className="btn btn-info" type="submit">
          Search
        </button>
      </form>
      <div className=" text-start ms-3 mb-1">
        <h1>Shiraz</h1>
        <ul>
          <li>Last updated: Mon 00:00</li>
          <li>Mist</li>
        </ul>
        <div className="IconHumidity ms-3">
          <div className="row">
            <div className=" col-6">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAg5JREFUeNrt2tGRgyAQBmBLoARLSAmUkBIsISVYgiVYgiVQgq//myXQAfdwS4bJqRFuCWjWmZ3JaGYin8AumMY513xzNAIgAAIgAAIgAAIgAAIgAALwe4LhANACGADMANxLzHStbQoc2QGoce5g9JcBAKA2nvi7mAGoUwP8o/FPhOoBAGgAIwBD0ftxHNntiw6HJICdBiqa8BxD2E9MjNEAAO4bNzwxPn0fA/WsbNkjBWDZuNkHXZ8ZAQ5DfQQAwG3nJjR9xxWKpOwRC6D3AGgOcGdCYAMI0p8rHEMWAGq82Zit++B7roJoWQEAdBs/NPouR/PDUAnAwAaw0+27YKEzVdLw6EryCIDZabymIeBqC06AP93+QEa4LMASlLv2GwF81zc1N54bwJe29kA1WHMY/wBjAe4vY388KUBYLbY5FkNniudSOwXAXSTmlLWAKtRl/a4T91K7qxlgXKvpKQVzzUOmxiFgg70FBeBBu0I9fVacVWiNk6AOFmB2A6gLUrIO9wAoa5mcADnT4Phm9blWlClC0B6Pzve5AHIWQm1EmW1pSNiVcv129GGlboubXGmJGsWS56l37GFOqQA5FkMmputGDKeRLQ1+4mAEWKp4OxzR6KXEirA4QOZ9RPPuHWNRAMb3iMmbpKUBdOkNktIAt+oB5F9iAiAAAiAAAiAAAiAAAiAAAiAAAiAAl48fFVnRpiVnD+AAAAAASUVORK5CYII=" />
            </div>
            <div className=" col-6">
              <ul>
                <li>Humidity: 80%</li>
                <li>Wind: 10 km/h</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="Temperature ">
          <span className="degree">11</span>
          <span className="units">°C|°F</span>
        </div>
      </div>
    </div>
  );

  if (loaded) {
    return (
      <div className="Weather mt-5 rounded">
        <form className="input-group mt-1 mb-5 " onSubmit={handleSubmit}>
          <input
            onChange={showCity}
            type="text"
            className="form-control"
            placeholder="Type a city"
            aria-label="name of citiy"
            aria-describedby="button-addon2"
          />
          <button className="btn btn-info" type="submit">
            Search
          </button>
        </form>
        <div className=" text-start ms-3 mb-1">
          <h1>{info.name}</h1>
          <ul>
            <li>Last updated: Mon 00:00</li>
            <li>{info.description}</li>
          </ul>
          <div className="IconHumidity ms-3">
            <div className="row">
              <div className=" col-6">
                <img src={info.icon} />
              </div>
              <div className=" col-6">
                <ul>
                  <li>
                    Humidity:{""}
                    {info.humidity}
                    {""}%
                  </li>
                  <li>Wind: {info.wind}km/h</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="Temperature ">
            <span className="degree">{Math.round(info.temperature)}</span>
            <span className="units">°C|°F</span>
          </div>
        </div>
      </div>
    );
  } else {
    return searchForm;
  }
}
export default Weather;
