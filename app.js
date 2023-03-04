let h2 = document.querySelector("h2");

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

h2.innerHTML = `${day} ${hours}:${minutes}`;

function findCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let h1 = document.querySelector("#city");
  h1.innerHTML = city;
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
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temperature-description");
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#valueHumidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#valueWind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#valueVisibility").innerHTML =
    response.data.visibility;
  document.querySelector("#valueSunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#valuePressure").innerHTML =
    response.data.main.pressure;
  document.querySelector("#valueSunset").innerHTML = response.data.sys.sunset;
  document.querySelector("#valueWindGust").innerHTML = Math.round(
    response.data.wind.gust
  );
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", findCity);

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
  temperatureElement.innerHTML = `${temperature}`;
  cityElement.innerHTML = city;
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#valueHumidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#valueWind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#valueVisibility").innerHTML =
    response.data.visibility;
  document.querySelector("#valueSunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#valuePressure").innerHTML =
    response.data.main.pressure;
  document.querySelector("#valueSunset").innerHTML = response.data.sys.sunset;
  document.querySelector("#valueWindGust").innerHTML = Math.round(
    response.data.wind.gust
  );
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);
