(()=>{var e={865:()=>{const e=document.querySelector(".change-quote"),t=document.querySelector(".quote"),n=document.querySelector(".author");let o,c;async function r(){const e=await fetch("https://type.fit/api/quotes"),r=await e.json();o=r.length,console.log(r),c=Math.floor(Math.random()*o+1),t.textContent=`"${r[c].text}"`,n.textContent=`${r[c].author}`}document.querySelector(".quote-box"),r(),e.addEventListener("click",r)},723:()=>{const e=document.querySelector(".set-button"),t=document.querySelector(".settings-container"),n=document.querySelectorAll(".set-btn"),o=document.querySelectorAll(".set-item"),c=document.querySelectorAll(".checkbox");e.addEventListener("click",(function(){t.classList.contains("active")?t.classList.remove("active"):t.classList.add("active")})),n.forEach((e=>{e.addEventListener("click",(()=>{let t=e,c=t.getAttribute("data-tab"),r=document.querySelector(c);t.classList.contains("active")||n.forEach((e=>{e.classList.remove("active")})),o.forEach((e=>{e.classList.remove("active")})),t.classList.add("active"),r.classList.add("active")}))})),document.querySelector(".set-btn").click(),c.forEach((e=>{e.addEventListener("click",(()=>{console.log("clicked"),e.classList.toggle("on")}))}))},538:()=>{const e=document.querySelector(".time"),t=document.querySelector(".date"),n=document.querySelector(".greeting"),o=document.querySelector(".name"),c=document.querySelector("body"),r=document.querySelector(".slide-next"),a=document.querySelector(".slide-prev");let i,s;function l(){const n=(new Date).toLocaleTimeString();e.innerHTML=n,function(){const e=(new Date).toLocaleDateString("en-US",{month:"long",day:"numeric"});t.textContent=e}(),y(),g(),setTimeout(l,1e3)}const u=(new Date).getHours(),d=["night","morning","afternoon","evening"],m=y(),f=`Good ${m},`;function y(){const e=Math.floor(u/6);return d[e]}function g(){n.innerHTML=f}function v(){const e=new Image;e.src=s,e.addEventListener("load",(()=>{c.style.backgroundImage=`url('${s}')`}))}function p(){s=function(){const e=i.toString().padStart(2,"0");return console.log(e),`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${m}/${e}.jpg`}()}window.addEventListener("beforeunload",(function(){localStorage.setItem("name",o.value)})),window.addEventListener("load",(function(){localStorage.getItem("name")&&(o.value=localStorage.getItem("name"))})),l(),r.addEventListener("click",(function(){i++,21===i&&(i=1),p(),v()})),a.addEventListener("click",(function(){i--,0===i&&(i=20),p(),v()})),l(),g(),i=Math.floor(20*Math.random()+1),console.log(i),p(),v()},599:()=>{const e=document.querySelector(".city"),t=document.querySelector(".weather-icon"),n=document.querySelector(".temperature"),o=document.querySelector(".weather-description"),c=document.querySelector(".wind"),r=document.querySelector(".humidity"),a=document.querySelector(".weather-error");async function i(){const i=`https://api.openweathermap.org/data/2.5/weather?q=${e.value}&lang=en&appid=b89974bf87a7c53fdce36f4da8c22492&units=metric`,s=await fetch(i),l=await s.json();try{if("city not found"===l.message||"Nothing to geocode"===l.message)throw new Error("Not Found");console.log(l),console.log(l.weather[0].id,l.weather[0].description,l.main.temp,l.wind.speed,l.main.humidity),t.className="weather-icon owf",t.classList.add(`owf-${l.weather[0].id}`),n.textContent=`${l.main.temp.toFixed(0)}°C`,o.textContent=`Forecast: ${l.weather[0].description}`,c.textContent=`Wind speed: ${l.wind.speed} m/s`,r.textContent=`Humidity: ${l.main.humidity} %`}catch(e){a.innerHTML="Сity is not found. Please check spelling",t.className="",n.textContent="",o.textContent="",c.textContent="",r.textContent=""}}i(),localStorage.getItem("city")&&(e.value=localStorage.getItem("city")),document.addEventListener("DOMContentLoaded",i),e.addEventListener("keypress",(function(t){"Enter"===t.code&&(i(),e.blur(),localStorage.setItem("city",e.value))}))}},t={};function n(o){var c=t[o];if(void 0!==c)return c.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}(()=>{"use strict";n(538),n(599),n(865);const e=[{title:"Aqua Caelestis",src:"/assets/sounds/Aqua Caelestis.mp3",duration:"00:58"},{title:"Ennio Morricone",src:"/assets/sounds/Ennio Morricone.mp3",duration:"00:58"},{title:"River Flows In Your",src:"/assets/sounds/River Flows In Your.mp3",duration:"03:50"},{title:"Summer Wind",src:"/assets/sounds/Summer Wind.mp3",duration:"00:58"}];console.log(e);const t=document.querySelector(".player__btn--back"),o=document.querySelector(".player__btn--play"),c=document.querySelector(".player__btn--forward"),r=document.querySelector(".player__range"),a=document.querySelector(".player__timer"),i=document.querySelector(".player__duration"),s=document.querySelector(".player__btn--volume"),l=document.querySelector(".player__volume"),u=document.querySelector(".player__list");e.forEach((e=>{const t=document.createElement("li");t.classList.add("player__item"),t.textContent=e.title,u.append(t)}));const d=document.querySelectorAll(".player__item");let m=new Audio,f=!1,y=0,g=0,v=50;function p(){m.src=e[y].src,m.play(),f=!0,h(),L()}function h(){f?(o.classList.add("icon-pause"),o.classList.remove("icon-play"),d.forEach((e=>e.classList.remove("playing"))),d[y].classList.add("playing")):(o.classList.add("icon-play"),o.classList.remove("icon-pause"),d.forEach((e=>e.classList.remove("playing"))))}function L(){d.forEach((e=>e.classList.remove("active"))),d[y].classList.add("active")}function S(){y++,y===e.length&&(y=0),p()}function q(){const e=m.duration;g="NaN"===g?g:m.currentTime;const t=g/e*100;r.value=isNaN(t)?0:t,r.style.background=`linear-gradient(to right, rgb(129 140 186) 0%, rgb(172 194 226) ${t}%, #ffffff ${t}%)`,E(g),g===e&&(m.pause(),f=!1)}function E(t){const n=Math.floor(t/3600)>0?Math.floor(t/3600):"",o=Math.floor(t/60),c=Math.floor(t%60),r=w(n)+(""===w(n)?"":":");a.textContent=`${r}${w(o)}:${w(c)}`,i.textContent=e[y].duration}function w(e){return"number"==typeof e&&e<10?`0${e}`:e}function b(){s.classList.add("icon-volumeMute"),m.muted=!0,v=0}function k(){s.classList.remove("icon-volumeMute"),m.muted=!1}function x(e){v=+e,l.value=v,m.volume=v/100;const t=v/100*100;l.style.background=`linear-gradient(to right, rgb(129 140 186) 0%, rgb(172 194 226) ${t}%, #ffffff ${t}%)`,0===v?b():k()}function $(e){e===y||(y=e,p())}m.src=e[0].src,i.textContent=e[0].duration,L(),l.value=v,q(),x(v),d.forEach(((e,t)=>e.addEventListener("click",(()=>$(t))))),o.addEventListener("click",(function(){f?(m.pause(),f=!1,h()):p()})),t.addEventListener("click",(function(){y--,0===y&&(y=e.length),p()})),c.addEventListener("click",S),d.forEach(((e,t)=>e.addEventListener("click",(()=>$(t))))),m.addEventListener("ended",S),m.addEventListener("timeupdate",q),r.addEventListener("click",(function(){const e=m.duration;g=e*r.value/100,m.currentTime=g,r.style.background=`linear-gradient(to right, rgb(129 140 186) 0%, rgb(172 194 226) ${r.value}%, #ffffff ${r.value}%)`,E(g)})),s.addEventListener("click",(function(){const e=v;s.classList.contains("icon-volumeMute")?(k(),v=e,x(v)):(b(),x(v),v=e)})),l.addEventListener("input",(()=>{x(l.value)})),n(723)})()})();