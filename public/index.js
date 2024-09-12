const dayNightCheckbox = document.getElementById("day-night-checkbox");
const cowImage = document.getElementById("cow");
const speechBubble = document.getElementById("speech-bubble");
const speechText = document.getElementById("cow-speech");
const noticeboard = document.getElementById("noticeboard");
const moo = document.getElementById("moo")
const cowbell = document.getElementById("cowbell")
const cowpat = document.getElementById("cowpat")
const clouds = document.querySelectorAll(".cloud")
// move this to a separate file
const whatTheCowSays = ["Mooooooooooo!", "Hey, who turned off all the lights?<br>Brrr, I'm freisian!", "Oh, What a beautiful Mooooorning!", "Hey, quit poking me, that's mooolestation!", "Oi, don't make me hoof it over there - you'll udderly regret it!"]

// average uk supermarket price per litre (aug 2024)
const milkPrices = {
  cow: 0.95,
  oat: 2,
  soya: 2,
  almond: 2
}

// frontend interaction

function theCowSpeaks(mooing) {
  // check this line
  let fontSize = (2.2-mooing.length*0.01) < 0.8 ? 0.8 : (2.2-mooing.length*0.01)
  console.log(mooing.length, fontSize, 2.2-mooing.length*0.01)
  speechText.style.fontSize = `${fontSize}rem`
  speechBubble.style.opacity = "1";
  moo.play();
  speechText.innerHTML = mooing;
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

function boughtMilk() {
  buttonSound()
}

function drankMilk() {
  buttonSound()
}

async function spiltMilk() {
  buttonSound()
  // fetch random quote
  const randomQuote = await fetch("/quote")
  const parsed = await randomQuote.json()
  theCowSpeaks(`Oh dear.<br>Perhaps this observation from ${parsed.author} will help:<br>"${parsed.quote}".`)
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
