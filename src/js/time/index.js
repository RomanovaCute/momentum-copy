const timeBox = document.querySelector('.time');
const dateBox = document.querySelector('.date')
const showGreeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const body = document.querySelector('body')
const slidenext = document.querySelector('.slide-next')
const slideprev = document.querySelector('.slide-prev')
let randomNum;
let imageURL;

const greetingTranslation = {
  en: {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    night: 'Good night'
  },
  ru: {
    morning: 'Доброе утро',
    afternoon: 'Добрый день',
    evening: 'Добрый вечер',
    night: 'Доброй ночи'
  }
}

function initMomentum() {
  showTime();
  showGreet();
  getRandomNum();
  getImageURL();
  setBg();
}

function showTime() {
    const time = new Date();
    const currentTime = time.toLocaleTimeString();
    timeBox.innerHTML = currentTime;

    showDate();
    getTimeOfDay();
    showGreet();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US', options);
    dateBox.textContent = currentDate;
}

const date = new Date();
const hours = date.getHours();
const timeOfDayList = ['night', 'morning', 'afternoon', 'evening'];
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay},`;

function getTimeOfDay() {
    const weekDay = Math.floor(hours / 6)
    return timeOfDayList[weekDay]
}

function showGreet() {
    showGreeting.innerHTML = greetingText;
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
  }
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }
window.addEventListener('load', getLocalStorage)

showTime() 


function getRandomNum() {
  randomNum = Math.floor(Math.random()* 20 + 1);
  console.log(randomNum);
}

function setBg() {
    const img = new Image();
    img.src = imageURL;
    img.addEventListener('load', () => {
      body.style.backgroundImage = `url('${imageURL}')`;
    });
  }

function getSlideNext() {
    randomNum++;
    if (randomNum === 21) {
      randomNum = 1;
    }
    getImageURL();
    setBg();
}
  
function getSlidePrev() {
    randomNum--;
    if (randomNum === 0) {
      randomNum = 20;
    }
    getImageURL();
    setBg();
}

function getImageURL() {
      imageURL = imageURLCollection();
}

function imageURLCollection() {
    const bgNum = randomNum.toString().padStart(2, "0");
    console.log(bgNum);
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    return url;
  }


async function imageUnsplash() {
  const id = 'zREUY0sQCAS5MrfzDPDZU-olHVDPVWkZM6v3eU9jVIA';
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${id}`;
  const res = await fetch(url);
  const data = await res.json();
  imageURL = data.urls.regular;
  console.log(imageURL);
  setBg();
}

async function imageFlickr() {
  const id = 'dc556c8b1ed93bf66b8c6f08ffe13ae9';
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${id}&tags=nature&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const photos = data.photos.photo;
  console.log(photos);
  const index = Math.round(Math.random(0, 1) * photos.length);
  imageURL = data.photos.photo[index].url_h;
  setBg();
}

// переключение слайдов кнопками
slidenext.addEventListener('click', getSlideNext)
slideprev.addEventListener('click', getSlidePrev)







  initMomentum()