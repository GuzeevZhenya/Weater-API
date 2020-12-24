// let weatherTime = document.querySelectorAll('.weather-time');

//     let city = document.querySelector('.input').value;
//     console.log(city.value);

//     weatherTime.forEach(item => {
//         item.addEventListener('click', (e) => {
//             let part = e.target;
//             console.log(part.value);
//         })
//     })


let time = document.querySelectorAll('.time');
let weatherDays = document.querySelector('.weather-days');
let city = document.querySelector('.input');
let div = document.querySelectorAll('.package');
let temperature = document.querySelectorAll('.temperature');
let button = document.querySelector('.button');
let disclaimer = document.querySelectorAll('.disclaimer');
let icons = document.querySelectorAll('.features li');

let invisible = document.querySelector('.pricing-table');


button.addEventListener('click', (e) => {
    e.preventDefault();
    invisible.style.display = "flex";
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

    // fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&appid=ea04db02d64d4b2b6453bfc814cd3cf9`)
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&dt=1586468027&lang=ru&appid=ea04db02d64d4b2b6453bfc814cd3cf9`)
        .then(function(resp) { return resp.json() }) //convert data to json
        .then(function(data) {

            for (let i = 0; i < div.length; i++) {
                document.querySelectorAll('.package-name').textContent = city.value;
                temperature[i].innerHTML = Math.floor(data.hourly[i].temp - 273) + '&deg';
                time[i].innerHTML = 'Влажность ' + data.hourly[i].humidity + "%";
                disclaimer[i].innerHTML = data.hourly[i].weather[0]['description'];
                icons[i].innerHTML = `<img src="https://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@2x.png">`;


                console.log(city.value);

            }



            // document.querySelector('.package-name').textContent = data.name;
            // document.querySelector('.price').innerHTML = Math.round(data.main.temp - 273) + '&deg';
            // document.querySelector('.disclaimer').textContent = data.weather[0]['description'];
            // document.querySelector('.features li').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            // console.log(1);
        })
        .catch(function() {

            //catch any errors
        });
    // })
});