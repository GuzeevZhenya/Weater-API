let time = document.querySelectorAll('.time');
let weatherDays = document.querySelector('.weather-days');
let city = document.querySelector('.input');
let div = document.querySelectorAll('.package');
let temperature = document.querySelectorAll('.temperature');
let button = document.querySelector('.button');
let disclaimer = document.querySelectorAll('.disclaimer');
let icons = document.querySelectorAll('.features li');
let weatherInformation = document.querySelector('.pricing-table');
weatherInformation.classList.add = '.row';

// let invisible = document.querySelector('.pricing-table');


button.addEventListener('click', (e) => {
    e.preventDefault();
    weatherInformation.style.display = "flex";


    if (city.value === '') {
        return;
    }

    weatherDays.addEventListener('click', (e) => {
        weatherDays.classList.toggle('.five-days');
        for (let i = 1; i < div.length; i++) {
            if (weatherDays.classList.contains('.five-days')) {
                div[i].style.display = 'none';
            } else {
                div[i].style.display = 'block';
            }
        }
    })

    fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=hqZM0yzr5AMhh6Au5FZzvResHAEELg2N&location=${city.value}`)
        .then(function (resp) {
            return resp.json()
        }) //convert data to json
        .then(function (data) {
            console.log(data.results[0].locations[0].latLng);
            const {
                lat,
                lng
            } = data.results[0].locations[0].latLng;
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&dt=1586468027&lang=ru&appid=ea04db02d64d4b2b6453bfc814cd3cf9`)

        })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            console.log(data);


            for (let i = 0; i < data.hourly.length; i++) {

                let hourlyDiv = document.createElement('div');
                hourlyDiv.className = 'package featured';
                let hourlyName = document.createElement('p');
                hourlyName = 'package-name';
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

                weatherInformation.appendChild(hourlyDiv)
                hourlyDiv.appendChild(hourlyHr);
                hourlyDiv.appendChild(hourlyTemperature);
                hourlyDiv.appendChild(hourlyDisclaimer);
                hourlyDiv.appendChild(hourlyTime);
                hourlyDiv.appendChild(hourlyUl);


                div[i].querySelector('.package-name').textContent = city.value;
                temperature[i].innerHTML = Math.floor(data.hourly[i].temp - 273) + '&deg';
                time[i].innerHTML = 'Влажность ' + data.hourly[i].humidity + "%";
                disclaimer[i].innerHTML = data.hourly[i].weather[0]['description'];
                icons[i].innerHTML = `<img src="https://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@2x.png">`;





            }


        })
        .catch(function () {

            //catch any errors
        });


})