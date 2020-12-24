// let button = document.querySelector('.button');
// let weatherTime = document.querySelectorAll('.weather-time');
// button.addEventListener('click', (e) => {
//     let city = document.querySelector('.input').value;
//     console.log(city.value);

//     weatherTime.forEach(item => {
//         item.addEventListener('click', (e) => {
//             let part = e.target;
//             console.log(part.value);
//         })
//     })


// fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&appid=ea04db02d64d4b2b6453bfc814cd3cf9`)
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=52,8926&lon=30,024&dt=1586468027&appid=ea04db02d64d4b2b6453bfc814cd3cf9`)
    .then(function(resp) { return resp.json() }) //convert data to json
    .then(function(data) {

        console.log(data.daily);
        console.log(data.timezone);

        let time = document.querySelectorAll('.time');
        time.forEach(item => {
            console.log(item);
            item = data.daily[item];
        })

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