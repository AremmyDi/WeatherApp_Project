function displayTemperature (response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#current-Icon");
  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute(
      "alt", response.data.weather[0].description);
}

function formatDate (timestamp) {
  let date = new Date(timestamp);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = weekDays[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours (timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
  let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  return `${hours}:${minutes}`;
}

function displayForecast (response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += 
      `         
        <div class="col-2">
        <h4>
        ${formatHours(forecast.dt * 1000)}
        </h4>
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" alt="forecastIcon">
        <div class="weather-forecast-temperature" id="forecast-temperature">
          <span><strong>${Math.round(forecast.main.temp_max)}°</strong>| ${Math.round(forecast.main.temp_min)}°</span>
        </div>
        </div>
      `
  }
}
function search (city) {
  let apiKey = "30e779d5dfda5389f3e7fff3e46e0d16";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function submitValue (event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input").value;
  search(cityInputElement);
}

function displayFahrenheit (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");
  let fahrenheit = Math.round((celsiusTemperature*9/5)+32);
  temperatureElement.innerHTML = fahrenheit;
}

function displayCelsius (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");
  let celsius = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = celsius;
}

search("Paris");

let form = document.querySelector("#search-form");
form.addEventListener("submit",submitValue);

let fahrenheitLink = document.querySelector("#fahrenheit-Converter");
fahrenheitLink.addEventListener("click",displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-Converter");
celsiusLink.addEventListener("click",displayCelsius);

let celsiusTemperature = null;