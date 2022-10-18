import { useEffect } from "react";
import { useWeather } from "./useWeather";

export function Weather() {
  const {
    api,
    finalApi,
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
    console.log(finalApi);
  }, [userCall]);

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
            {JSON.stringify(finalApi.coord)}
          </>
        )}
      </div>
    </>
  );
}
