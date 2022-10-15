import { useEffect } from "react";
import { useWeather } from "./useWeather";

export function Weather() {
  const {
    api,
    userInput,
    userCall,
    lat,
    lon,
    newCall,
    handleInput,
    handleSubmit,
  } = useWeather();

  useEffect(() => {
    newCall();
    console.log(api);
  }, [userCall, lat, lon]);

  return (
    <>
      <div>
        <button onClick={newCall}>Fetch</button>
        <input
          value={userInput}
          onChange={handleInput}
          placeholder="Insert a city"
        ></input>
        <button onClick={handleSubmit}>Search</button>
        {/* {JSON.stringify(api)} */}
        {/* {api.cod === "400" ? "Error" : JSON.stringify(api[0].name)} */}
        {api.cod === "400" ? (
          "Error"
        ) : (
          <>
            {api[0].name}
            {api[0].state}
            {lat}
          </>
        )}
      </div>
    </>
  );
}
