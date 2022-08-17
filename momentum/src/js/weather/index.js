const city = document.querySelector('.city'),
      icon = document.querySelector('.weather-icon'),
      temperature = document.querySelector('.temperature'),
      descrip = document.querySelector('.weather-description'),
      wind = document.querySelector('.wind'),
      humid = document.querySelector('.humidity'),
      errorBox = document.querySelector('.weather-error');

const lang = `en`
const apiKey = 'b89974bf87a7c53fdce36f4da8c22492'
const host = `https://api.openweathermap.org/data/2.5/weather?q=`

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    try {
      if(data.message === 'city not found' || data.message === 'Nothing to geocode'){
        throw new Error('Not Found')
      }

    console.log(data);
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp, data.wind.speed, data.main.humidity);
 
    icon.className = 'weather-icon owf';
    icon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    descrip.textContent = `Forecast: ${data.weather[0].description}`;
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
    humid.textContent = `Humidity: ${data.main.humidity} %`;
    } catch (err) {
      errorBox.innerHTML = 'Сity is not found. Please check spelling';
      icon.className = ''
      temperature.textContent = '';
      descrip.textContent = '';
      wind.textContent = '';
      humid.textContent = ''; 
    }
}

getWeather()
getLocalStorageCity()

function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
      setLocalStorageCity()
    }
  }

function setLocalStorageCity() {
    localStorage.setItem('city', city.value);
}

function getLocalStorageCity() {
  if (localStorage.getItem('city')) {
  city.value = localStorage.getItem('city');
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
