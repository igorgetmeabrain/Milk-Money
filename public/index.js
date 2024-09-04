const dayNightCheckbox = document.getElementById("day-night-checkbox");
const cowImage = document.getElementById("cow");
const speechBubble = document.getElementById("speech-bubble");
const speechText = document.getElementById("cow-speech");
const noticeboard = document.getElementById("noticeboard");
const moo = document.getElementById("moo")
const cowbell = document.getElementById("cowbell")
const cowpat = document.getElementById("cowpat")
const clouds = document.querySelectorAll(".cloud")
const whatTheCowSays = ["Moooooooo!", "Hey, who turned off all the lights?<br>Brrr, I'm freisian!", "Oh, What a beautiful Mooooorning!", "Hey, quit poking me, that's mooolestation!", "Oi, don't make me hoof it over there - you'll udderly regret it!"]

// average uk supermarket price per litre (aug 2024)
const milkPrices = {
  cow: 0.95,
  oat: 2,
  soya: 2,
  almond: 2
}

console.log("Hello")
fetch('./cowquotes.json')
.then((res) => {console.log(res.json())})

// frontend interaction

function theCowSpeaks(mooing) {
  speechBubble.style.opacity = "1";
  moo.play();
  speechText.innerHTML = mooing
  setTimeout(()=>{
    speechBubble.style.opacity = "0";
    speechText.innerHTML = "";
  }, "10000")
}

let cowPokeCount = 0;
function pokeTheCow() {
  if (cowPokeCount>2) {
    theCowSpeaks(whatTheCowSays[cowPokeCount])
  } else {
    theCowSpeaks(whatTheCowSays[0])
  }
  cowPokeCount++
  return cowPokeCount>4 ? cowPokeCount = 0 : cowPokeCount
}

// button functions

function buttonSound() {
  cowbell.currentTime = 0;
  cowbell.play();
}

function buttonOneClick() {
  buttonSound()
}

function buttonTwoClick() {
  buttonSound()
}

function buttonThreeClick() {
  buttonSound()
}

// tab functions

function tabSound() {
  cowpat.currentTime = 0;
  cowpat.play();
}

function tabOneClick() {
  tabSound()
}

function tabTwoClick() {
  tabSound()
}

function tabThreeClick() {
  tabSound()
}

function tabFourClick() {
  tabSound()
}

function dayNight() {
  if (dayNightCheckbox.checked) {
    cowImage.src = "images/nightcow.png";
    clouds.forEach(cloud => cloud.style.backgroundColor = "hsla(0, 0%, 20%, 0.9)");
    speechBubble.style.backgroundImage = "url(images/nightspeech.png)";
    noticeboard.style.backgroundImage = "url(images/dark-noticeboard.png)";
    noticeboard.style.color = "white";
    speechText.style.color = "white";
    theCowSpeaks(whatTheCowSays[1]);
  } else {
    cowImage.src = "images/daycow.png";
    clouds.forEach(cloud => cloud.style.backgroundColor = "hsla(0, 0%, 100%, 0.9)");
    speechBubble.style.backgroundImage = "url(images/dayspeech.png)";
    noticeboard.style.backgroundImage = "url(images/noticeboard.png)";
    speechText.style.color = "black";
    noticeboard.style.color = "black";
    theCowSpeaks(whatTheCowSays[2]);
  }
}

function buyMilk() {

}

