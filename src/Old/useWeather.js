import { useState } from "react";

export function useWeather() {
  const [api, setCall] = useState([{}]);
  const [finalApi, setFinalApi] = useState();
  const [userInput, setUserInput] = useState("");
  const [userCall, setUserCall] = useState("");
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  const apiKey = "d2077362b591c2e1b040194260639109";
  let city = userCall;
  const cityCall = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  const call = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  // const call = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  async function newCall() {
    const response = await fetch(cityCall);
    const newData = await response.json();
    setCall(newData);
    setLat(newData[0].lat);
    setLon(newData[0].lon);
    // console.log(newData);
    finalCall();
  }

  async function finalCall() {
    const finalResponse = await fetch(call);
    const finalData = await finalResponse.json();
    setFinalApi(finalData);
  }

  function handleInput({ target }) {
    setUserInput(target.value);
  }

  function handleSubmit() {
    setUserCall(userInput);
    setUserInput(""); // reset input
  }

  return {
    api,
    finalApi,
    userInput,
    userCall,
    lat,
    lon,
    newCall,
    handleInput,
    handleSubmit,
  };
}
