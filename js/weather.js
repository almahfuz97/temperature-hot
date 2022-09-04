const API_KEY = '3f5babe4c006cd66a8f8c3a33f81afd6';

const loadCityApi = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayWeather(data, 2, cityName))
        .catch(err => console.log(alert("No city found by that name!")));
}


const displayWeather = (data, n, city) => {
    console.log(data)
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('degree');
    const lead = document.getElementById('lead');

    if (n === 2) {
        if (city.toLowerCase() === data.name.toLowerCase()) {
            cityName.innerText = data.name;
            temperature.innerText = data.main.temp;
            lead.innerText = data.weather[0].description;
        }
        else {
            alert("no city name found!");
        }
    }
    else {
        cityName.innerText = data.name;
        temperature.innerText = data.main.temp;
        lead.innerText = data.weather[0].description;
    }

}


// geo find meeee
const geoFindMe = () => {

    // const status = document.querySelector('#status');
    // const mapLink = document.querySelector('#map-link');

    // mapLink.href = '';
    // mapLink.textContent = '';

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayWeather(data, 1))
            .catch(err => console.log(err));


        //   status.textContent = '';
        //   mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        //   mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        console.log(latitude, longitude);

    }

    function error() {
        // status.textContent = 'Unable to retrieve your location';
        console.log('unable');

    }

    if (!navigator.geolocation) {
        // status.textContent = 'Geolocation is not supported by your browser';
        console.log('no supported')
    } else {
        // status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);

    }

}

geoFindMe();


const displayWeatheronClick = () => {
    const inputFeild = document.getElementById('input-id');
    const inputText = inputFeild.value;
    console.log(inputText);

    loadCityApi(inputText);

}

// input enter handler
document.getElementById('input-id').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const inputFeild = document.getElementById('input-id');
        const inputText = inputFeild.value;
        console.log(inputText);
        loadCityApi(inputText);
        e.preventDefault();
        // document.getElementById('search-btn').click();
    }
}, false)