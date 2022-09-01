import '../language/index'
import i18next from 'i18next';
import '../settings/index'
import { state } from '../settings/index'
import { getLocalStorageState } from '../settings/index';

const timeBox = document.querySelector('.time'),
      dateBox = document.querySelector('.date'),
      showGreeting = document.querySelector('.greeting'),
      name = document.querySelector('.name'),
      body = document.querySelector('body'),
      slidenext = document.querySelector('.slide-next'),
      slideprev = document.querySelector('.slide-prev'),
      picBtns = document.querySelectorAll('.pic-source'),
      tagInput = document.querySelector('.tag');
let randomNum;
let imageURL;
let photoSourceValue;


window.addEventListener('DOMContentLoaded', () => {
  showTime();
  getLocalStorageName();
  showGreet();
  getRandomNum();
  getLocalStorageState();
  getImageURL();
  setBg();
})

/*время*/
function showTime() {
    const time = new Date();
    const currentTime = time.toLocaleTimeString();
    timeBox.innerHTML = currentTime;

    showDate();
    getTimeOfDay();
    showGreet();
    setTimeout(showTime, 1000);
}


const date = new Date();
const hours = date.getHours();
const timeOfDayList = ['night', 'morning', 'afternoon', 'evening'];
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay},`;


function showDate() {
    const timeCode = 'en-US'
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(`${timeCode}`, options);
    dateBox.textContent = currentDate;
}


function getTimeOfDay() {
    const weekDay = Math.floor(hours / 6)
    return timeOfDayList[weekDay]
}

function showGreet() {
    showGreeting.innerHTML = greetingText;
}

function setLocalStorageName() {
    localStorage.setItem('name', name.value);
  }
window.addEventListener('beforeunload', setLocalStorageName)

function getLocalStorageName() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }

showTime() 


/*фон*/
function getRandomNum() {
  randomNum = Math.floor(Math.random()* 20 + 1);
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
      if(JSON.parse(localStorage.getItem('state')).photoSource === 'bg-github'){
        imageURL = imageURLCollection();
        console.log('github choosen');
      } else if (JSON.parse(localStorage.getItem('state')).photoSource === 'bg-unsplash'){
        imageURL = imageUnsplash();
        console.log('unsplash choosen');
      } else if (JSON.parse(localStorage.getItem('state')).photoSource === 'bg-flickr'){
        imageURL = imageFlickr().then(data => data);
        console.log('flickr choosen');
      }
}

/*источники фотографий*/
function imageURLCollection() {
    const bgNum = randomNum.toString().padStart(2, "0");
    console.log(bgNum);
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    return url;
  }

async function imageUnsplash() {
  const id = 'zREUY0sQCAS5MrfzDPDZU-olHVDPVWkZM6v3eU9jVIA';
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=${id}`;
  const res = await fetch(url);
  const data = await res.json();
  imageURL = data.urls.regular;
  console.log(imageURL);
  setBg();
}

async function imageFlickr() {
  const id = 'dc556c8b1ed93bf66b8c6f08ffe13ae9';
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${id}&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const photos = data.photos.photo;
  const index = Math.round(Math.random(0, 1) * photos.length);
  imageURL = data.photos.photo[index].url_l;
  setBg();
}

//поиск фото по тегу
let tag;

function getTag(){
  if(!localStorage.getItem('tag')){
    tag = timeOfDay;
  }
  tag = localStorage.getItem('tag');
}

getTag();

function setTag(event){
  if (event.code === 'Enter') {
    tagInput.blur();
    localStorage.setItem('tag', tagInput.value);
    setBg()
    tagInput.innerHTML = '';
  }
}

tagInput.addEventListener('keypress', setTag)

// переключение слайдов кнопками
slidenext.addEventListener('click', getSlideNext)
slideprev.addEventListener('click', getSlidePrev)


function setLocalStorageState(){
  localStorage.setItem('state', JSON.stringify(state));
}

//переключение источника фона
picBtns.forEach(button => {
  button.addEventListener('click', (event) => {
    photoSourceValue = event.target.id;
    console.log(photoSourceValue);
    state.photoSource = photoSourceValue;
    
    setLocalStorageState();
    getImageURL();
    setBg();
  })
})
