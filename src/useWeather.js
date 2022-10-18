import axios from "axios";
import { useState } from "react";

export function useWeather() {
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

  //   onChange={(event) => setLocation(event.target.value)}
  function handleInput(event) {
    setLocation(event.target.value);
  }

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

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return {
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
  };
}
