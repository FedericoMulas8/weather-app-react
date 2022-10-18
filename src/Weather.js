import wind from "./assets/img/wind.png";
import humidity from "./assets/img/humidity.png";
import pressure from "./assets/img/pressure.png";
import { useWeather } from "./useWeather";

export function Weather() {
  const {
    location,
    data,
    day,
    today,
    icon,
    description,
    temperature,
    feelLike,
    handleInput,
    searchLocation,
  } = useWeather();

  return (
    <div className="container">
      <div className="inputs">
        <input
          value={location}
          onChange={handleInput}
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
