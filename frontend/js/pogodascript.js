// const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const windspeed = document.querySelector(".windspeed");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=d3450adcb3a9754a836a92b0dcd77c1c";
const API_UNITS = "&units=metric";

// const miasto = localStorage.getItem('miasto');


const getWeather = () => {


  const city = "Pyrzowice";
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios.get(URL).then((res) => {
    console.log(res.data);
    const temp = res.data.main.temp;
    const hum = res.data.main.humidity;
    const wind = res.data.wind.speed;

    const status = Object.assign({}, ...res.data.weather);
    console.log(status);

    weather.textContent = status.main;
    temperature.textContent = Math.floor(temp) + "°C";
    humidity.textContent = hum + "%";
    windspeed.textContent = wind + " km/h";

    if (status.id >= 600 && status.id < 300) {
      photo.setAttribute("src", "../assets/img/fog.png");
    } else if (status.id >= 200 && status.id <= 232) {
      photo.setAttribute("src", "../assets/img/thunderstorm.png");
    } else if (status.id >= 300 && status.id <= 321) {
      photo.setAttribute("src", "../assets/img/drizzle.png");
    } else if (status.id >= 500 && status.id <= 531) {
      photo.setAttribute("src", "../assets/img/rain.png");
    } else if (status.id >= 802 && status.id <= 804) {
      photo.setAttribute("src", "../assets/img/cloud.png");
    } else if ((status.id = 800)) {
      photo.setAttribute("src", "../assets/img/sun.png");
    } else {
      photo.setAttribute("src", "../assets/img/unknown.png");
    }
  });
};

function startTime() {
  const today = new Date();
  let day = today.getDay();
  let month = today.getMonth();
  let year = today.getFullYear();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  document.getElementById(
    "clock"
  ).textContent = `today: ${year}-${month}-${day} time: ${h}: ${m}: ${s} `;

  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

getWeather();
startTime();
