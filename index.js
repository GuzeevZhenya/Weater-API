const weatherInformation = document.querySelector('.pricing-table');
const weatherDays = document.querySelector('.weather-days');
const weatherWeek = document.querySelector('.weather-week');
const weatherMonth = document.querySelector('.weather-month');
const city = document.querySelector('.input');
const weatherApiKey = "ea04db02d64d4b2b6453bfc814cd3cf9";
const geolocationApiKey = "hqZM0yzr5AMhh6Au5FZzvResHAEELg2N";



weatherWeek.addEventListener('click', () => weatherAPI('daily'));
weatherDays.addEventListener('click', () => weatherAPI('hourly'));

function weatherAPI(weatherType) {
    getCityGeolocation(city.value)
        .then(({ lat, lng }) =>
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&dt=1586468027&lang=ru&appid=${weatherApiKey}`)
        )

    .then((resp) => resp.json())

    .then((data) => createWeatherBlocks(data[weatherType], weatherType))

    .catch((e) => alert(e));
}

function getCityGeolocation(cityName) {
    return fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${geolocationApiKey}&location=${cityName}`)
        .then((resp) => resp.json())
        .then((data) => data.results[0].locations[0].latLng)

}

function createWeatherBlocks(dataInfo, weatherType) {
    weatherInformation.textContent = "";
    for (let i = 0; i < dataInfo.length; i++) {
        weatherInformation.appendChild(createWeatherCard(dataInfo[i], city.value, weatherType));
    }
}


function createWeatherCard(weatherInfo, cityName, weatherType) {
    const temp = Math.floor(weatherType === 'hourly' ? weatherInfo.temp : weatherInfo.temp.day) - 273;
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
    const time = new Date(unixTime * 1000);
    const formatter = new Intl.DateTimeFormat("ru");
    const hourFormatter = new Intl.DateTimeFormat("ru", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    return `${formatter.format(time)}, ${hourFormatter.format(time)} `;
}

// let time = document.querySelectorAll('.time');
// let weatherDays = document.querySelector('.weather-days');
// let weatherWeek = document.querySelector('.weather-week');
// let weatherMonth = document.querySelector('.weather-month');
// let city = document.querySelector('.input');
// let div = document.querySelectorAll('.package');
// let temperature = document.querySelectorAll('.temperature');
// let button = document.querySelector('.button');
// let disclaimer = document.querySelectorAll('.disclaimer');
// let icons = document.querySelectorAll('.features li');
// let weatherInformation = document.querySelector('.pricing-table');
// weatherInformation.classList.add = '.row';
// let invisible = document.querySelector('.pricing-table');


// button.addEventListener('click', (e) => {
//     e.preventDefault();
//     weatherInformation.style.display = "flex";
// })

// if (city.value === '') {
//     return;
// }




// weatherWeek.addEventListener('click', (e) => {
//     weatherDays.classList.toggle('.five-days');
//     for (let i = 0; i < div.length; i++) {
//         if (weatherDays.classList.contains('.five-days')) {
//             div[i].style.display = 'none';
//         } else {
//             div[i].style.display = 'block';
//         }
//     }
//     weatherInformation.style.display = "flex";
//     weatherAPIWeek();

// })

// weatherDays.addEventListener('click', (e) => {
//     weatherDays.classList.toggle('.five-days');
//     for (let i = 0; i < div.length; i++) {
//         if (weatherDays.classList.contains('.five-days')) {
//             div[i].style.display = 'none';
//         } else {
//             div[i].style.display = 'block';
//         }
//     }
//     weatherInformation.style.display = "flex";
//     weatherAPIHour();
// })

// function weatherAPIHour() {
//     fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=hqZM0yzr5AMhh6Au5FZzvResHAEELg2N&location=${city.value}`)
//         .then(function(resp) {
//             return resp.json()
//         }) //convert data to json
//         .then(function(data) {
//             console.log(data.results[0].locations[0].latLng);
//             const {
//                 lat,
//                 lng
//             } = data.results[0].locations[0].latLng;

//             return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&dt=1586468027&lang=ru&appid=ea04db02d64d4b2b6453bfc814cd3cf9`)

//         })
//         .then(function(resp) {
//             return resp.json()
//         })
//         .then(function(data) {
//             createWeatherBlocks(data.hourly);
//             console.log(data);
//         })
//         .catch(function() {
//             //catch any errors
//         });
// }

// function weatherAPIWeek() {
//     fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=hqZM0yzr5AMhh6Au5FZzvResHAEELg2N&location=${city.value}`)
//         .then(function(resp) {
//             return resp.json()
//         }) //convert data to json
//         .then(function(data) {
//             console.log(data.results[0].locations[0].latLng);
//             const {
//                 lat,
//                 lng
//             } = data.results[0].locations[0].latLng;
//             return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&dt=1586468027&lang=ru&appid=ea04db02d64d4b2b6453bfc814cd3cf9`)

//         })
//         .then(function(resp) {
//             return resp.json()
//         })
//         .then(function(data) {
//             createWeekWeatherBlocks(data.daily);
//             console.log(data);

//         })
//         .catch(function() {
//             //catch any errors
//         });
// }




// function createWeatherBlocks(dataInfo) {
//     weatherInformation.textContent = "";
//     for (let i = 0; i < dataInfo.length; i++) {
//         let hourlyDiv = document.createElement('div');
//         hourlyDiv.className = 'package featured';
//         let hourlyName = document.createElement('p');
//         hourlyName.className = 'package-name';
//         let hourlyHr = document.createElement('hr');
//         let hourlyTemperature = document.createElement('p');
//         hourlyTemperature.className = 'temperature';
//         let hourlyDisclaimer = document.createElement('p');
//         hourlyDisclaimer.className = 'disclaimer';
//         let hourlyTime = document.createElement('p');
//         hourlyTime.className = 'time';
//         let hourlyUl = document.createElement('ul');
//         hourlyUl.className = 'features';
//         let hourlyLi = document.createElement('li');
//         let hourlyWeatherTime = document.createElement('p');
//         hourlyWeatherTime.className = 'weather-time';

//         weatherInformation.appendChild(hourlyDiv);
//         hourlyDiv.appendChild(hourlyName);
//         hourlyDiv.appendChild(hourlyHr);
//         hourlyDiv.appendChild(hourlyTemperature);
//         hourlyDiv.appendChild(hourlyDisclaimer);
//         hourlyDiv.appendChild(hourlyTime);
//         hourlyDiv.appendChild(hourlyUl);
//         hourlyDiv.appendChild(hourlyWeatherTime);
//         hourlyUl.appendChild(hourlyLi);

//         hourlyName.textContent = city.value;
//         hourlyTemperature.innerHTML = Math.floor(dataInfo[i].temp - 273) + '&deg';
//         hourlyTime.innerHTML = 'Влажность ' + dataInfo[i].humidity + "%";
//         hourlyDisclaimer.innerHTML = dataInfo[i].weather[0]['description'];
//         hourlyLi.innerHTML = `<img src="https://openweathermap.org/img/wn/${dataInfo[i].weather[0].icon}@2x.png">`;

//         let time = new Date(dataInfo[i].dt);
//         let formatter = new Intl.DateTimeFormat("ru");
//         let hourFormatter = new Intl.DateTimeFormat("ru", {
//             hour: "numeric",
//             minute: "numeric",
//             second: "numeric"
//         });
//         hourlyWeatherTime.innerHTML = `${formatter.format(time * 1000)}, ${hourFormatter.format(time)} `;

//     }
// }

// function createWeekWeatherBlocks(dataInfo) {
//     weatherInformation.textContent = "";
//     for (let i = 0; i < dataInfo.length; i++) {
//         let hourlyDiv = document.createElement('div');
//         hourlyDiv.className = 'package featured';
//         let hourlyName = document.createElement('p');
//         hourlyName.className = 'package-name';

//         let hourlyTemperature = document.createElement('p');
//         hourlyTemperature.className = 'temperature';
//         let hourlyDisclaimer = document.createElement('p');
//         hourlyDisclaimer.className = 'disclaimer';
//         let hourlyTime = document.createElement('p');
//         hourlyTime.className = 'time';
//         let hourlyUl = document.createElement('ul');
//         hourlyUl.className = 'features';
//         let hourlyLi = document.createElement('li');
//         let hourlyWeatherTime = document.createElement('p');
//         hourlyWeatherTime.className = 'weather-time';

//         weatherInformation.appendChild(hourlyDiv);
//         hourlyDiv.appendChild(hourlyName);

//         hourlyDiv.appendChild(hourlyTemperature);
//         hourlyDiv.appendChild(hourlyDisclaimer);
//         hourlyDiv.appendChild(hourlyTime);
//         hourlyDiv.appendChild(hourlyUl);
//         hourlyDiv.appendChild(hourlyWeatherTime);
//         hourlyUl.appendChild(hourlyLi);

//         hourlyName.textContent = city.value;
//         hourlyTemperature.innerHTML = Math.floor(dataInfo[i].temp.day - 273) + '&deg';
//         hourlyTime.innerHTML = 'Влажность ' + dataInfo[i].humidity + "%";
//         hourlyDisclaimer.innerHTML = dataInfo[i].weather[0]['description'];
//         hourlyLi.innerHTML = `<img src="https://openweathermap.org/img/wn/${dataInfo[i].weather[0].icon}@2x.png">`;

//         let time = new Date(dataInfo[i].dt);
//         let formatter = new Intl.DateTimeFormat("ru");
//         hourlyWeatherTime.innerHTML = formatter.format(time * 1000);


//     }
// }