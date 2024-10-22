const dayNightCheckbox = document.getElementById("day-night-checkbox");
const cowImage = document.getElementById("cow");
const speechBubble = document.getElementById("speech-bubble");
const speechText = document.getElementById("cow-speech");
const noticeboard = document.getElementById("noticeboard");
const moo = document.getElementById("moo");
const cowbell = document.getElementById("cowbell");
const cowpat = document.getElementById("cowpat");
const clouds = document.querySelectorAll(".cloud");
const toggleUnitButton = document.getElementById("toggle-units");
const whatTheCowSays = [
  "Mooooooooooo!", 
  "Hey, who turned off all the lights?<br>Brrr, I'm freisian!", 
  "Oh, What a beautiful Mooooorning!", 
  "Hey, quit poking me, that's mooolestation!", 
  "Oi, don't make me hoof it over there - you'll udderly regret it!"
];

/* HOMEPAGE INTERACTION */

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
  buttonSound();
  openModal();
}

function drankMilk() {
  buttonSound()
}

async function needMilk() {
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
    noticeboard.style.color = "white";
    speechText.style.color = "white";
    theCowSpeaks(whatTheCowSays[1]);
  } else {
    cowImage.src = "images/daycow.png";
    clouds.forEach(cloud => cloud.style.backgroundColor = "hsla(0, 0%, 100%, 0.9)");
    speechBubble.style.backgroundImage = "url(images/dayspeech.png)";
    speechText.style.color = "black";
    noticeboard.style.color = "black";
    theCowSpeaks(whatTheCowSays[2]);
  }
}

function buyMilk() {

}

const toggleUnits = () => toggleUnitButton.innerText == "Litres" ? toggleUnitButton.innerText = "Pints" : toggleUnitButton.innerText = "Litres"

// modal functions
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const modalSubmit = document.querySelector("#modal-submit");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const modalHandler = async () => {
  const errorArea = document.querySelector("#error-div");
  const resultArea = document.querySelector("#result-div"); 
  const numberInput = document.querySelector("#milk-qty");
  const milkQty = numberInput.value;
  const unitsButton = document.querySelector("#toggle-units");
  const units = unitsButton.innerText;
  
  const stuff = {"qty": milkQty, "units": units}

  const data = await fetch("/buy-milk", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(stuff)
  });
  
  const parsed = await data.json();
  if (parsed.error) {
    errorArea.innerText = JSON.stringify(parsed);
    return;
  }

  resultArea.innerText = parsed.result;
  return; 
};

modalSubmit.addEventListener("click", modalHandler);
closeModalBtn.addEventListener("click", closeModal);


