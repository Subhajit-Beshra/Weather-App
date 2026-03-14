hereasync function getWeather(){
    let city = document.getElementById("city").value;

    try{
        let geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );

        let geoData = await geo.json();

        let lat = geoData.results[0].latitude;
        let lon = geoData.results[0].longitude;

        let weather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );

        let weatherData = await weather.json();

        let temp = weatherData.current_weather.temperature;
        let wind = weatherData.current_weather.windspeed;

        document.querySelector("#weather").innerHTML =
        `<h2>${city}</h2>
        <div class="temp">${temp}°C</div>
        <div class="details">
            <p>Wind: ${wind} km/h</p>
            <p>Condition: Clear</p>
        </div>`;
    }
    catch(error){
        document.querySelector("#weather").innerHTML = "City not found!";
    }
}
