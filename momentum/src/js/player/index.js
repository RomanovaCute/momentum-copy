import playList from '../playList/index';
console.log(playList);

const prev = document.querySelector('.player__btn--back'),
    play = document.querySelector('.player__btn--play'),
    next = document.querySelector('.player__btn--forward'),
    range = document.querySelector('.player__range'),
    timer = document.querySelector('.player__timer'),
    duration = document.querySelector('.player__duration'),
    volumeBtn = document.querySelector('.player__btn--volume'),
    volumeBar = document.querySelector('.player__volume'),
    playListContainer = document.querySelector('.player__list');

playList.forEach(playerItem => {
    const playListItem = document.createElement('li');
    playListItem.classList.add('player__item');
    playListItem.textContent = playerItem.title;
    playListContainer.append(playListItem);
});

const playListItems = document.querySelectorAll('.player__item');

let audio = new Audio();
let isPlaying = false;
let playNum = 0;
let currentTime = 0;
let isMousedown = false;
let isVolumeOn = true;
let lastVolumeValue = 50;

function initPlayer(index){
    audio.src = playList[index].src;
    duration.textContent = playList[index].duration;
    // showSongTitle();
    showActivePlayerListItem();
    volumeBar.value = lastVolumeValue;
    handleProgress();
    handleProgressVolume(lastVolumeValue);
}

function playAudio(){
    audio.src = playList[playNum].src;
    audio.play();
    isPlaying = true;

    toggleIcon();
    showActivePlayerListItem();
    // showSongTitle();
}

function toggleIcon() {
    if (!isPlaying) {
      play.classList.add('icon-play');
      play.classList.remove('icon-pause');
      playListItems.forEach(playListItem => playListItem.classList.remove('playing'));
    }
    else {
      play.classList.add('icon-pause');
      play.classList.remove('icon-play');
      playListItems.forEach(playListItem => playListItem.classList.remove('playing'));
      playListItems[playNum].classList.add('playing');
    }
}

function showActivePlayerListItem() {
    playListItems.forEach(playListItem => playListItem.classList.remove('active'));
    playListItems[playNum].classList.add('active');
}

function pauseAudio() {
    audio.pause();
    isPlaying = false;
    toggleIcon();
}

function toggleAudio() {
    if (isPlaying) {
      pauseAudio();
    }
    else {
      playAudio();
    }
}

function playPrev() {
    playNum--;
    if (playNum === 0) {
      playNum = playList.length;
    }
    playAudio();
}
  
function playNext() {
    playNum++;
    if (playNum === playList.length) {
      playNum = 0;
    }
    playAudio();
}

function handleProgress() {
    const duration = audio.duration;
    currentTime = (currentTime === 'NaN') ? currentTime : audio.currentTime;
    const percent = (currentTime / duration) * 100;
    range.value = (isNaN(percent)) ? 0 : percent;
    range.style.background = `linear-gradient(to right, rgb(129 140 186) 0%, rgb(172 194 226) ${percent}%, #ffffff ${percent}%)`;
    displayReadableTime(currentTime);
    
    if (currentTime === duration) {
      audio.pause();
      isPlaying = false;
    };
  }
  
  function setProgress() {
    const duration = audio.duration;
    currentTime = duration * range.value / 100;
    audio.currentTime = currentTime;
    range.style.background = `linear-gradient(to right, rgb(129 140 186) 0%, rgb(172 194 226) ${range.value}%, #ffffff ${range.value}%)`;
    displayReadableTime(currentTime);
  }
  
  function displayReadableTime(currentTime) {
    const hours = Math.floor(currentTime / 3600) > 0 ? Math.floor(currentTime / 3600) : '';
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const showHours = formatNumber(hours) + (formatNumber(hours) === '' ? '' : ':')
    timer.textContent = `${showHours}${formatNumber(minutes)}:${formatNumber(seconds)}`;
    duration.textContent = playList[playNum].duration;
  }
  
  function formatNumber(number) {
    return typeof number === 'number' && number < 10 ? `0${number}` : number;
  }
  
  function toggleVolume() {
    const prevVolumeValue = lastVolumeValue;
  
    if (!volumeBtn.classList.contains('icon-volumeMute')) {
      mute();
      handleProgressVolume(lastVolumeValue);
      lastVolumeValue = prevVolumeValue;
    }
    else {
      unmute();
      lastVolumeValue = prevVolumeValue;
      handleProgressVolume(lastVolumeValue);
    }
  }
  
  function mute() {
    volumeBtn.classList.add('icon-volumeMute');
    audio.muted = true;
    lastVolumeValue = 0;
  }
  
  function unmute() {
    volumeBtn.classList.remove('icon-volumeMute');
    audio.muted = false;
  }
  
  function handleProgressVolume(volumeValue) {
    lastVolumeValue = +volumeValue;
    volumeBar.value = lastVolumeValue;
    audio.volume = lastVolumeValue / 100;
    const volumeMax = 100;
    const percent = (lastVolumeValue / volumeMax) * 100;
    volumeBar.style.background = `linear-gradient(to right, rgb(129 140 186) 0%, rgb(172 194 226) ${percent}%, #ffffff ${percent}%)`;
    if (lastVolumeValue === 0) {
      mute();
    } else {
      unmute();
    }
  }
  
initPlayer(0);

    function playByClick(index) {
        if (index === playNum) {
        //   toggleAudio();
        }
        else {
          playNum = index;
          playAudio();
        }
      }


playListItems.forEach((playListItem, index) => playListItem.addEventListener('click', () => playByClick(index)));

play.addEventListener('click', toggleAudio);
prev.addEventListener('click', playPrev);
next.addEventListener('click', playNext);
playListItems.forEach((playListItem, index) => playListItem.addEventListener('click', () => playByClick(index)));
audio.addEventListener ('ended', playNext);
audio.addEventListener('timeupdate', handleProgress);

range.addEventListener('click', setProgress);

volumeBtn.addEventListener('click', toggleVolume);
volumeBar.addEventListener('input', () => {
  handleProgressVolume(volumeBar.value);
});