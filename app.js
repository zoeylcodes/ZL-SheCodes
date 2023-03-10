let now = new Date();
let hours = now.getHours();
let timing = hours < 12 ? "AM" : "PM";
if (hours > 12) {
  hours -= 12;
}
if (hours === 0) {
  hours = 12;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

dateTime.innerHTML = `${day} ${hours}:${minutes} ${timing}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
          <div class="card" style="width: 10rem">
          <div class="descript">${forecastDay.weather[0].main}</div>
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png";
              class="card-img-top"
              alt="weather icon"
            />
            <div class="card-body">
              <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
              <p class="card-text">
                <span class="forecast-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°|</span> 
                <span class="forecast-temp-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              
              </p>
            </div>
          </div>
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function findCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let h1 = document.querySelector("#city");
  h1.innerHTML = city;
  searchWeather(city);
}

function getCity(city) {
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
  searchWeather(city);
}

function searchWeather(city) {
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temperature-description");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#valueHumidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#valueWind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let sunriseTimeUTC = new Date(response.data.sys.sunrise * 1000);
  let sunriseTimeLocal = sunriseTimeUTC.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.querySelector("#valueSunrise").innerHTML = sunriseTimeLocal;

  let sunsetTimeUTC = new Date(response.data.sys.sunset * 1000);
  let sunsetTimeLocal = sunsetTimeUTC.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.querySelector("#valueSunset").innerHTML = sunsetTimeLocal;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", findCity);
getCity("Toronto");

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let coordinates = { lat: latitude, lon: longitude };
  getForecast(coordinates);
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getForecast(coordinates) {
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showPositionbtn(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let coordinates = { lat: latitude, lon: longitude };
  getForecastbtn(coordinates);
}

function getForecastbtn(coordinates) {
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#temperature-description");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${temperature}`;
  document.querySelector("#city").innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#valueHumidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#valueWind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let sunriseTimeUTC = new Date(response.data.sys.sunrise * 1000);
  let sunriseTimeLocal = sunriseTimeUTC.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.querySelector("#valueSunrise").innerHTML = sunriseTimeLocal;

  let sunsetTimeUTC = new Date(response.data.sys.sunset * 1000);
  let sunsetTimeLocal = sunsetTimeUTC.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

function showFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);
