async function getWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("weather-result");

    if (city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    try {
        // 1️⃣ Get latitude & longitude from city name
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            result.innerHTML = "City not found";
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // 2️⃣ Fetch weather using lat & lon
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        result.innerHTML = `
            <h3>${name}, ${country}</h3>
            <p>Temperature: ${weatherData.current_weather.temperature} °C</p>
            <p>Wind Speed: ${weatherData.current_weather.windspeed} km/h</p>
        `;

    } catch (error) {
        result.innerHTML = "Error fetching weather data";
    }
}
