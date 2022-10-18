import axios from "axios";
import { useState } from "react";
import wind from "./assets/img/wind.png";
import humidity from "./assets/img/humidity.png";
import pressure from "./assets/img/pressure.png";

export function Weather() {
  const [data, setData] = useState({
    name: "-",
    main: { temp: "-" },
  });
  const [location, setLocation] = useState("");

  const apiKey = "d2077362b591c2e1b040194260639109";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  const feelLike =
    typeof data.main.feels_like === "number" &&
    data.main.feels_like.toFixed() + "°";

  const temperature =
    typeof data.main.temp === "number" ? data.main.temp.toFixed() + "°" : "-";

  const icon =
    data.weather &&
    require(`./assets/img/${data.weather[0].icon.replace(/[a-z]/gi, "")}.png`);

  const description = data.weather && data.weather[0].description;

  let day;
  switch (new Date().getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return (
    <div className="container">
      <div className="inputs">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
          className="input__field"
          id="name"
        ></input>
        <label htmlFor="name" className="form__label">
          Insert a city
        </label>
      </div>

      <div className="mainInfo">
        <div className="info">
          <div className="place">
            <p id="displaytitle">{data.name}</p>
          </div>

          <div className="date">
            <p id="displaysecondary">
              {data.clouds && (
                <>
                  {day}, {today}
                </>
              )}
            </p>
            {/* <p>{data.clouds && today}</p> */}
          </div>
        </div>

        <div className="display">
          <div className="icon">
            {data.weather ? (
              <img className="display__icon" src={icon}></img>
            ) : (
              <p className="cityAlert">Insert a city</p>
            )}
          </div>

          <div className="spec">
            {data.weather && <p id="displaysecondary">{description}</p>}
          </div>
        </div>

        <div className="weather">
          <div className="temperature">
            <p id="displaytitle">{data.main && temperature}</p>
          </div>

          <div className="feel">
            {data.main && (
              <p id="displaysecondary">
                {data.main.feels_like && `Feel like: ${feelLike}`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Outro */}
      {data.main.feels_like && (
        <div className="outro">
          <div className="outroContainer">
            <div className="humidity">
              <div className="outroicon">
                <img src={humidity}></img>
              </div>
              <div className="outroinfo">
                <p>{data.main && data.main.humidity}%</p>
                <p id="infotitle">Humidity</p>
              </div>
            </div>
            <div className="wind">
              <div className="outroicon">
                <img src={wind}></img>
              </div>
              <div className="outroinfo">
                <p>{data.wind && data.wind.speed}km/h</p>
                <p id="infotitle">Wind Speed</p>{" "}
              </div>
            </div>
            <div className="pressure">
              <div className="outroicon">
                <img src={pressure}></img>
              </div>
              <div className="outroinfo">
                <p>{data.main && data.main.pressure}°</p>
                <p id="infotitle">Pressure</p>{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 
Clouds


far corrispondere alle mie icon i valori di openweather
*/
