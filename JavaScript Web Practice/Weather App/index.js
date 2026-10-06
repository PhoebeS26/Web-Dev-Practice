

const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const weatherCode = document.getElementById("weather_code");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-city");
const cityName = document.getElementById("city");
const weatherIcon = document.getElementById("weather-icon");
const errorMessage = document.getElementById("error-message");
const feels = document.getElementById("feels");

function getWeatherInfo(code) {
    switch (code) {
        case 0:
            return {
                description: "Clear sky",
                icon: "☀️"
            };

        case 1:
            return {
                description: "Mainly clear",
                icon: "🌤️"
            };

        case 2:
            return {
                description: "Partly cloudy",
                icon: "⛅"
            };

        case 3:
            return {
                description: "Overcast",
                icon: "☁️"
            };

        case 45:
        case 48:
            return {
                description: "Foggy",
                icon: "🌫️"
            };

        case 51:
        case 53:
        case 55:
            return {
                description: "Drizzle",
                icon: "🌦️"
            };

        case 61:
        case 63:
        case 65:
            return {
                description: "Rain",
                icon: "🌧️"
            };

        case 71:
        case 73:
        case 75:
            return {
                description: "Snow",
                icon: "❄️"
            };

        case 80:
        case 81:
        case 82:
            return {
                description: "Rain showers",
                icon: "🌦️"
            };

        case 95:
            return {
                description: "Thunderstorm",
                icon: "⛈️"
            };

        default:
            return {
                description: "Unknown weather",
                icon: "🌍"
            };
    }
}

async function searchWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city.";
        return;
    }

    errorMessage.textContent = "";
    searchButton.textContent = "Loading...";
    searchButton.disabled = true;

    try {
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            throw new Error("City not found");
        }

        const location = locationData.results[0];

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${location.latitude}` +
            `&longitude=${location.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code`;

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Weather data unavailable");
        }

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        cityName.textContent = location.name;

        temperature.textContent =
            `${Math.round(current.temperature_2m)}°C`;

        humidity.textContent =
            `${current.relative_humidity_2m}%`;

        feels.textContent =
            `${Math.round(current.apparent_temperature)}°C`;

        const weather = getWeatherInfo(current.weather_code);

        weatherCode.textContent = weather.description;
        weatherIcon.textContent = weather.icon;

    } catch (error) {
        console.error(error);

        errorMessage.textContent =
            "Couldn't find that city. Please try again.";

    } finally {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}

searchButton.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchWeather();
    }
});

cityInput.value = "London";
searchWeather();
