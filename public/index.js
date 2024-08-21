const dayNightCheckbox = document.getElementById("day-night");
const cowImage = document.getElementById("cow");
const speechBubble = document.getElementById("speech-bubble");
const speechText = document.getElementById("cow-speech");
const moo = document.getElementById("moo")
const cowbell = document.getElementById("cowbell")
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
    cowImage.src = "images/nightcow.png"
    speechBubble.style.backgroundImage = "url(images/nightspeech.png)"
    speechText.style.color = "white";
    theCowSpeaks("Hey, who turned off all the lights?")
  } else {
    cowImage.src = "images/daycow.png"
    speechBubble.style.backgroundImage = "url(images/dayspeech.png)"
    speechText.style.color = "black";
    theCowSpeaks("What a beautiful sunny day! Mooooo!")
  }
}

/* this needs to happen on successful login 
theCowSpeaks(welcomeUser)
*/

let thusSpakeTheCow = whatTheCowSays

