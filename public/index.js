const dayNightCheckbox = document.getElementById("day-night-checkbox");
const cowImage = document.getElementById("cow");
const speechBubble = document.getElementById("speech-bubble");
const speechText = document.getElementById("cow-speech");
const noticeboard = document.getElementById("noticeboard");
const moo = document.getElementById("moo")
const cowbell = document.getElementById("cowbell")
const clouds = document.querySelectorAll(".cloud")
let whatTheCowSays = "Moooooooo!"

function theCowSpeaks(whatTheCowSays) {
  speechBubble.style.opacity = "1";
  moo.play();
  speechText.innerText = whatTheCowSays
  setTimeout(()=>{
    speechBubble.style.opacity = "0";
    speechText.innerText = "";
  }, "5000")
}

function buttonSound() {
  cowbell.currentTime = 0;
  cowbell.play();
}

function dayNight() {
  if (dayNightCheckbox.checked) {
    cowImage.src = "images/nightcow.png";
    clouds.forEach(cloud => cloud.style.backgroundColor = "hsla(0, 0%, 20%, 0.9)");
    speechBubble.style.backgroundImage = "url(images/nightspeech.png)";
    noticeboard.style.backgroundImage = "url(images/dark-noticeboard.png)";
    noticeboard.style.color = "white";
    speechText.style.color = "white";
    theCowSpeaks("Hey, who turned off all the lights?");
  } else {
    cowImage.src = "images/daycow.png";
    clouds.forEach(cloud => cloud.style.backgroundColor = "hsla(0, 0%, 100%, 0.9)");
    speechBubble.style.backgroundImage = "url(images/dayspeech.png)";
    noticeboard.style.backgroundImage = "url(images/noticeboard.png)";
    speechText.style.color = "black";
    noticeboard.style.color = "black";
    theCowSpeaks("What a beautiful sunny day! Mooooo!");
  }
}

/* this needs to happen on successful login 
theCowSpeaks(welcomeUser)
*/

let thusSpakeTheCow = whatTheCowSays

