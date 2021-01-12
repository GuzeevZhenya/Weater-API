let time = document.querySelectorAll('.time');
let weatherDays = document.querySelector('.weather-days');
let weatherWeek = document.querySelector('.weather-week');
let weatherMonth = document.querySelector('.weather-month');
let city = document.querySelector('.input');
let div = document.querySelectorAll('.package');
let temperature = document.querySelectorAll('.temperature');
let button = document.querySelector('.button');
let disclaimer = document.querySelectorAll('.disclaimer');
let icons = document.querySelectorAll('.features li');
let weatherInformation = document.querySelector('.pricing-table');
// weatherInformation.classList.add = '.row';
// let invisible = document.querySelector('.pricing-table');


// button.addEventListener('click', (e) => {
//     e.preventDefault();
//     weatherInformation.style.display = "flex";
// })

// if (city.value === '') {
//     return;
// }


weatherWeek.addEventListener('click', (e) => {
    weatherDays.classList.toggle('.five-days');
    for (let i = 0; i < div.length; i++) {
        if (weatherDays.classList.contains('.five-days')) {
            div[i].style.display = 'none';
        } else {
            div[i].style.display = 'block';
        }
    }
    weatherInformation.style.display = "flex";
    weatherAPIWeek();

})

weatherDays.addEventListener('click', (e) => {
    weatherDays.classList.toggle('.five-days');
    for (let i = 0; i < div.length; i++) {
        if (weatherDays.classList.contains('.five-days')) {
            div[i].style.display = 'none';
        } else {
            div[i].style.display = 'block';
        }
    }
    weatherInformation.style.display = "flex";
    weatherAPIHour();


})


function weatherAPIHour() {
    fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=hqZM0yzr5AMhh6Au5FZzvResHAEELg2N&location=${city.value}`)
        .then(function(resp) {
            return resp.json()
        }) //convert data to json
        .then(function(data) {
            console.log(data.results[0].locations[0].latLng);
            const {
                lat,
                lng
            } = data.results[0].locations[0].latLng;

            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&dt=1586468027&lang=ru&appid=ea04db02d64d4b2b6453bfc814cd3cf9`)

        })
        .then(function(resp) {
            return resp.json()
        })
        .then(function(data) {
            createWeatherBlocks(data.hourly);
            console.log(data);
        })
        .catch(function() {
            //catch any errors
        });
}

function weatherAPIWeek() {
    fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=hqZM0yzr5AMhh6Au5FZzvResHAEELg2N&location=${city.value}`)
        .then(function(resp) {
            return resp.json()
        }) //convert data to json
        .then(function(data) {
            console.log(data.results[0].locations[0].latLng);
            const {
                lat,
                lng
            } = data.results[0].locations[0].latLng;

            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&dt=1586468027&lang=ru&appid=ea04db02d64d4b2b6453bfc814cd3cf9`)

        })
        .then(function(resp) {
            return resp.json()
        })
        .then(function(data) {
            createWeekWeatherBlocks(data.daily);
            console.log(data);

        })
        .catch(function() {
            //catch any errors
        });
}




function createWeatherBlocks(dataInfo) {
    for (let i = 0; i < dataInfo.length; i++) {
        let hourlyDiv = document.createElement('div');
        hourlyDiv.className = 'package featured';
        let hourlyName = document.createElement('p');
        hourlyName.className = 'package-name';
        let hourlyHr = document.createElement('hr');
        let hourlyTemperature = document.createElement('p');
        hourlyTemperature.className = 'temperature';
        let hourlyDisclaimer = document.createElement('p');
        hourlyDisclaimer.className = 'disclaimer';
        let hourlyTime = document.createElement('p');
        hourlyTime.className = 'time';
        let hourlyUl = document.createElement('ul');
        hourlyUl.className = 'features';
        let hourlyLi = document.createElement('li');
        let hourlyWeatherTime = document.createElement('p');
        hourlyWeatherTime.className = 'weather-time';

        weatherInformation.appendChild(hourlyDiv);
        hourlyDiv.appendChild(hourlyName);
        hourlyDiv.appendChild(hourlyHr);
        hourlyDiv.appendChild(hourlyTemperature);
        hourlyDiv.appendChild(hourlyDisclaimer);
        hourlyDiv.appendChild(hourlyTime);
        hourlyDiv.appendChild(hourlyUl);
        hourlyDiv.appendChild(hourlyWeatherTime);
        hourlyUl.appendChild(hourlyLi);

        hourlyName.textContent = city.value;
        hourlyTemperature.innerHTML = Math.floor(dataInfo[i].temp - 273) + '&deg';
        hourlyTime.innerHTML = 'Влажность ' + dataInfo[i].humidity + "%";
        hourlyDisclaimer.innerHTML = dataInfo[i].weather[0]['description'];
        hourlyLi.innerHTML = `<img src="https://openweathermap.org/img/wn/${dataInfo[i].weather[0].icon}@2x.png">`;
        hourlyWeatherTime.innerHTML = new Date(dataInfo[i].dt * 1000);
    }
}

function createWeekWeatherBlocks(dataInfo) {
    for (let i = 0; i < dataInfo.length; i++) {
        let hourlyDiv = document.createElement('div');
        hourlyDiv.className = 'package featured';
        let hourlyName = document.createElement('p');
        hourlyName.className = 'package-name';

        let hourlyTemperature = document.createElement('p');
        hourlyTemperature.className = 'temperature';
        let hourlyDisclaimer = document.createElement('p');
        hourlyDisclaimer.className = 'disclaimer';
        let hourlyTime = document.createElement('p');
        hourlyTime.className = 'time';
        let hourlyUl = document.createElement('ul');
        hourlyUl.className = 'features';
        let hourlyLi = document.createElement('li');
        let hourlyWeatherTime = document.createElement('p');
        hourlyWeatherTime.className = 'weather-time';

        weatherInformation.appendChild(hourlyDiv);
        hourlyDiv.appendChild(hourlyName);

        hourlyDiv.appendChild(hourlyTemperature);
        hourlyDiv.appendChild(hourlyDisclaimer);
        hourlyDiv.appendChild(hourlyTime);
        hourlyDiv.appendChild(hourlyUl);
        hourlyDiv.appendChild(hourlyWeatherTime);
        hourlyUl.appendChild(hourlyLi);

        hourlyName.textContent = city.value;
        hourlyTemperature.innerHTML = Math.floor(dataInfo[i].temp.day - 273) + '&deg';
        hourlyTime.innerHTML = 'Влажность ' + dataInfo[i].humidity + "%";
        hourlyDisclaimer.innerHTML = dataInfo[i].weather[0]['description'];
        hourlyLi.innerHTML = `<img src="https://openweathermap.org/img/wn/${dataInfo[i].weather[0].icon}@2x.png">`;
        hourlyWeatherTime.innerHTML = new Date(dataInfo[i].dt * 1000);
    }
}