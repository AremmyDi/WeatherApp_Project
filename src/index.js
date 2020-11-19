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
  let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
  let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  let day = weekDays[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function search (city) {
  let apiKey = "30e779d5dfda5389f3e7fff3e46e0d16";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayTemperature);
}

function submitValue (event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input").value;
  search(cityInputElement);
}

function displayFahrenheit (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheit = Math.round((celsiusTemperature*9/5)+32);
  temperatureElement.innerHTML = fahrenheit;
}

search("Paris");

let form = document.querySelector("#search-form");
form.addEventListener("submit",submitValue);

let fahrenheitLink = document.querySelector("#fahrenheit-Converter");
fahrenheitLink.addEventListener("click",displayFahrenheit);

let celsiusTemperature = null;