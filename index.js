const weatherInformation = document.querySelector(".pricing-table");
const weatherDays = document.querySelector(".weather-days");
const weatherWeek = document.querySelector(".weather-week");
const weatherMonth = document.querySelector(".weather-month");
const city = document.querySelector(".input");
const weatherApiKey = "ea04db02d64d4b2b6453bfc814cd3cf9";
const geolocationApiKey = "hqZM0yzr5AMhh6Au5FZzvResHAEELg2N";

weatherWeek.addEventListener("click", () => weatherAPI("daily"));
weatherDays.addEventListener("click", () => weatherAPI("hourly"));

function weatherAPI(weatherType) {
  getCityGeolocation(city.value)
    .then(({ lat, lng }) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&dt=1586468027&lang=ru&appid=${weatherApiKey}`
      )
    )
    .then((resp) => resp.json())
    .then((data) => createWeatherBlocks(data[weatherType], weatherType))
    .catch((e) => alert(e));
}

function getCityGeolocation(cityName) {
  return fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${geolocationApiKey}&location=${cityName}`)
    .then((resp) => resp.json()) //converts data to json
    .then((data) => data.results[0].locations[0].latLng);
}

function createWeatherBlocks(dataInfo, weatherType) {
  weatherInformation.textContent = "";
  for (let i = 0; i < dataInfo.length; i++) {
    weatherInformation.appendChild(createWeatherCard(dataInfo[i], city.value, weatherType));
  }
}

function createWeatherCard(weatherInfo, cityName, weatherType) {
  const temp = Math.floor(weatherType === "hourly" ? weatherInfo.temp : weatherInfo.temp.day) - 273;
  const cardMarkup = `
        <p class="package-name">${cityName}</p>
        <hr>
        <p class="temperature">${temp} &deg</p>
        <p class="disclaimer">${weatherInfo.weather[0]["description"]}</p>
        <p class="time">Влажность ${weatherInfo.humidity}%</p>
        <ul class="features">
            <li>
                <img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png">
            </li>
        </ul>
        <p class="weather-time">${getTimeString(weatherInfo.dt)}</p>`;
  const weatherBlock = document.createElement("div");
  weatherBlock.className = "package featured";
  weatherBlock.innerHTML = cardMarkup;
  return weatherBlock;
}

function getTimeString(unixTime) {
  const time = new Date(unixTime);
  const formatter = new Intl.DateTimeFormat("ru");
  const hourFormatter = new Intl.DateTimeFormat("ru", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return `${formatter.format(time * 1000)}, ${hourFormatter.format(time)} `;
}
