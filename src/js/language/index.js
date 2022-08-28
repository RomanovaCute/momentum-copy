import i18next from 'i18next';
import '../weather/index'
import '../quotes/index'
import '../settings/index'
import  getDate  from '../time'

const ruBtn = document.querySelector('#lang-ru'),
    engBtn = document.querySelector('#lang-eng'),
    langItem = document.querySelector('.language'),
    bgItem = document.querySelector('.background'),
    displayItem = document.querySelector('.display'),
    aboutItem = document.querySelector('.about'),

    setBtn = document.querySelectorAll('.set-btn'),
    setItems = document.querySelectorAll('.set-subtitle');

i18next.init({
    lng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
            day: {
                "morning": "Good morning",
                "day": "Good afternoon"
            },
            settings: {
                "0": "Language",
                "1": "Background",
                "2": "Display",
                "3": "About"
            },
            items: [
                {"0": "Audio"},
                {"1": "Weather"},
                {"2": "Time"},
                {"3": "Date"},
                {"4": "Greeting"},
                {"5": "Quote"},
                {"6": "Links"}
            ] 
        }
      },
      ru: {
        translation: {
            day: {
                "morning": "Доброе утро",
                "day": "Добрый день"
            },
            settings: {
                "0": "Язык",
                "1": "Фон",
                "2": "Отображение",
                "3": "Информация"
            },
            "items": [
                {"0": "Аудио"},
                {"1": "Погода"},
                {"2": "Время"},
                {"3": "Дата"},
                {"4": "Приветствие"},
                {"5": "Цитаты"},
                {"6": "Ссылки"}
            ]
        }
      }
    }
  });



ruBtn.addEventListener('click', () => {
    setBtn.forEach((elem, index) => {
        elem.innerHTML = i18next.t(`settings.${index}`, {lng: 'ru'})
    })
    setItems.forEach((elem, index) => {
        elem.innerHTML = i18next.t(`items.${index}.${index}`, {lng: 'ru'})
    })

})


engBtn.addEventListener('click', () => {
    setBtn.forEach((elem, index) => {
        elem.innerHTML = i18next.t(`settings.${index}`, {lng: 'en'})
    })
    setItems.forEach((elem, index) => {
        elem.innerHTML = i18next.t(`items.${index}.${index}`, {lng: 'en'})
    })

})