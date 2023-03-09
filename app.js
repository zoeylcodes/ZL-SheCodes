let dateTime = document.querySelector("#dateTime");

let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
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

dateTime.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col">
            <div class="card" style="width: 10rem">
              <img
                src="Images/mist-day.png"
                class="card-img-top"
                alt="rain drizzle"
              />
              <div class="card-body">
                <h5 class="card-title">${day}</h5>
                <p class="card-text">
                  20°|13° <br />
                  Rain
                </p>
              </div>
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
function findCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let h1 = document.querySelector("#city");
  h1.innerHTML = city;
  searchWeather(city);
}

function getCity(city) {
  let apiKey = "e22ed9083fe0fa0dbcc4f7e384978903";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
  searchWeather(city);
}

function searchWeather(city) {
  let apiKey = "e22ed9083fe0fa0dbcc4f7e384978903";
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
  let sunriseTimeLocal = sunriseTimeUTC.toLocaleTimeString();
  document.querySelector("#valueSunrise").innerHTML = sunriseTimeLocal;

  let sunsetTimeUTC = new Date(response.data.sys.sunset * 1000);
  let sunsetTimeLocal = sunsetTimeUTC.toLocaleTimeString();
  document.querySelector("#valueSunset").innerHTML = sunsetTimeLocal;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", findCity);
getCity("Toronto");

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e22ed9083fe0fa0dbcc4f7e384978903";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
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
  let sunriseTimeLocal = sunriseTimeUTC.toLocaleTimeString();
  document.querySelector("#valueSunrise").innerHTML = sunriseTimeLocal;

  let sunsetTimeUTC = new Date(response.data.sys.sunset * 1000);
  let sunsetTimeLocal = sunsetTimeUTC.toLocaleTimeString();
  document.querySelector("#valueSunset").innerHTML = sunsetTimeLocal;

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

let time = new Date().getHours();
let body = document.querySelector("body");

if (time >= 6 && hour < 18) {
  body.style.backgroundImage =
    "url(Images/wallpaperflare.com_wallpaperday.jpg)";
} else {
  body.style.backgroundImage =
    "url(Images/wp5181475-4k-colorful-landscape-wallpapers night)";
}
