async function genInfo() {
    let city = document.getElementById("cityInput").value;

    try {
        let geo = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );

        let geoData = await geo.json();

        let lat = geoData.results[0].latitude;
        let lon = geoData.results[0].longitude;

        document.querySelector(".loader").style.display = "block";
        document.querySelector(".weather-info").style.display = "none";


        let weather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );

        let weatherData = await weather.json();

        let temp = weatherData.current_weather.temperature;
        let wind = weatherData.current_weather.windspeed;

        document.querySelector(".loader").style.display = "none";
        document.querySelector(".weather-info").style.display = "block";

        document.querySelector(".weather-info").innerHTML =
            `<div class="city">
                <h2>${city} <span class="material-symbols-outlined city-icon">location_city</span></h2>
            </div>
            <div class="temperature">
                <h2>${temp}°C <span class="material-symbols-outlined temp-icon">device_thermostat</span></h2>
            </div>
            <div class="condition">
                <h2>Clear <span class="material-symbols-outlined condition-icon">info</span></h2>
            </div>
            <div class="humidity">
                <h3>Humidity: 60% <span class="material-symbols-outlined humidity-icon">humidity_percentage</span></h3>
            </div>`;
    } catch (error) {
        document.querySelector(".weather-info").innerHTML = "City not found!";
    }
}

