const dayNightCheckbox = document.getElementById("day-night-checkbox");
const cowImage = document.getElementById("cow");
const speechBubble = document.getElementById("speech-bubble");
const speechText = document.getElementById("cow-speech");
const noticeboard = document.getElementById("noticeboard");
const clouds = document.querySelectorAll(".cloud");
const whatTheCowSays = [
  "Mooooooooooo!", 
  "Hey, who turned off all the lights?<br>Brrr, I'm freisian!", 
  "Oh, What a beautiful Mooooorning!", 
  "Hey, quit poking me, that's mooolestation!", 
  "Oi, don't make me hoof it over there - you'll udderly regret it!"
];

let isItDaytime = true;

// audio clips
const moo = document.getElementById("moo");
const cowbell = document.getElementById("cowbell");
const cowpat = document.getElementById("cowpat");
const confettiSound = document.getElementById("confetti");
const badger = document.getElementById("badger");
const milkPour = document.getElementById("milk-pour");
const milkPourUp = document.getElementById("milk-pour-up");

/* HOMEPAGE INTERACTION */

function dayNight() {
  if (dayNightCheckbox.checked) {
    isItDaytime = false;
    cowImage.src = "images/nightcow.png";
    clouds.forEach(cloud => cloud.style.backgroundColor = "hsla(0, 0%, 20%, 0.9)");
    speechText.style.color = "white";
    noticeboard.style.backgroundColor = "black";
    theCowSpeaks(whatTheCowSays[1]);
  } else {
    isItDaytime = true;
    cowImage.src = "images/daycow.png";
    clouds.forEach(cloud => cloud.style.backgroundColor = "hsla(0, 0%, 100%, 0.9)");
    speechText.style.color = "black";
    noticeboard.style.backgroundColor = "white";
    theCowSpeaks(whatTheCowSays[2]);
  }
}

function theCowSpeaks(mooing) {
  // check this line
  let fontSize = (2.2-mooing.length*0.01) < 0.8 ? 0.8 : (2.2-mooing.length*0.01)
  console.log(mooing.length, fontSize, 2.2-mooing.length*0.01)
  speechText.style.fontSize = `${fontSize}rem`
  speechBubble.style.backgroundImage = isItDaytime ? "url(images/dayspeech.png)" : "url(images/nightspeech.png)";
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

function playConfettiSound() {
  confettiSound.currenTime = 0;
  confettiSound.play();
}

function boughtMilk() {
  buttonSound();
  openModal("buy");
}

function drankMilk() {
  buttonSound()
  openModal("drink");
}

async function needMilk() {
  buttonSound()
  // add catch error message
  const randomQuote = await fetch("/quote")
  const parsed = await randomQuote.json()
  theCowSpeaks(`Oh dear.<br>Perhaps this observation from ${parsed.author} will help:<br>"${parsed.quote}".`)
}

// tab functions
const leaderboardTab = document.getElementById("tab-1");
const balanceTab = document.getElementById("tab-2");
const dailyQuizTab = document.getElementById("tab-3");
const aboutTab = document.getElementById("tab-4");

function tabSound() {
  cowpat.currentTime = 0;
  cowpat.play();
}

const leaderboardHTML = (leaderboard) => {
  let HTMLString = `
  <h2>Leaderboard</h2>
  <h4>Rank Name Moonits</h4>
  <ol id="numbered-list">`
  leaderboard.forEach(o => HTMLString += `<li>${o.name} ${o.balance}</li>`)
  HTMLString += `</ol>`
  console.log(HTMLString)
  return HTMLString;
}

const balanceHTML = (transactions, balance) => {
  let HTMLString = `
  <div id="totaliser"></div>
  <div id="balance-text">
    <h2 id="balance-title">Your Moonit Balance</h2>
    <h3 id="balance-display">You have ${balance} moonits!</h3>
    <p id="transactions-text">Your recent transactions:</p>
    <ul>`
  transactions.forEach(t=>HTMLString += `<li>${t.moonits} moonits on ${t.date}</li>`);
  HTMLString += `
    </ul>
  </div>`;
  return HTMLString;
}

const modalHTML = `<section class="modal hidden">
<div class="flex" id="modal">
<img src="images/daycow.png" width="42px" height="50px" alt="mini cow logo" />
<button class="btn-close" onclick="closeModal()">⨉</button>
</div>
<div id="modal-content"></div>
<input type="date" id="transaction-date">
<button class="btn" id="modal-submit" onclick="modalHandler()">Submit</button>
<div id="error-div"></div>
<div id="result-div"></div>
</section>`

const resetNoticeboard = () => {
  allTabs.forEach(e => e.classList.remove("active-tab"));
  noticeboard.classList.remove("moonit-balance", "daily-quiz", "about", "modal-style", "leaderboard");
}

const displayLeaderboards = async () =>  {

  tabSound();
  resetNoticeboard();
  leaderboardTab.classList.add("active-tab");
  noticeboard.classList.add("leaderboard");

  const data = await fetch("/leaderboard");

  const parsed = await data.json();
  if (parsed.error) {
    noticeboard.innerText = JSON.stringify(parsed);
    return;
  }

  noticeboard.innerHTML = leaderboardHTML(parsed.leaderboard);
  return; 
}

// functions for totaliser display
function fillScaleElement(i) {
  setTimeout(function() {
    if (i>=-85 && i<=100) {
      document.getElementById(`${i}`).style.background = `hsl(${i+50}, 70%, 50%)`;
    } else if (i>100) {
      console.log("confetti")
    }
    document.getElementById("counter").innerText = `${i}`;
    
  }, i<0 ? -20*i : 20*i)
  
}

const fillTotaliser = (balance) => {
  const negPos = balance<0 ? -1 : 1
  if (balance<0) {milkPour.play()} else {milkPourUp.play()};
  for (let i=1; i<=balance*negPos; i++) {
    fillScaleElement(i*negPos)
  }
 setTimeout(()=>{milkPour.pause(); milkPourUp.pause(); milkPour.currentTime = 0; milkPourUp.currentTime = 0;}, balance*negPos*20)
}

const displayBalance = async () => {
  resetNoticeboard();
  balanceTab.classList.add("active-tab");
  noticeboard.classList.add("moonit-balance");

  const data = await fetch("/user-balance");

  const parsed = await data.json();
  if (parsed.error) {
    tabContent.innerText = JSON.stringify(parsed);
    return;
  }
  
  noticeboard.innerHTML = balanceHTML(parsed.transactions, parsed.balance);
  const totaliser = document.getElementById("totaliser");
  
  // create document fragment and populate
  let fragment = document.createDocumentFragment();
  let div, counter, posEls = 100, negEls = -85;
  for (let i=0; i<posEls; i++) {
   div = document.createElement("div")
   div.className = "scale"
   div.id = `${posEls-i}`
   fragment.appendChild(div)
  }

  const zero = document.createElement("hr");
  fragment.appendChild(zero);

  for (let i=-1; i>=negEls; i--) {
    div = document.createElement("div")
    div.className = "scale"
    div.id = `${i}`
    fragment.appendChild(div)
  }
  counter = document.createElement("p")
  counter.innerText = "0";
  fragment.appendChild(counter).id = "counter";
  totaliser.appendChild(fragment)

  fillTotaliser(parsed.balance);
  return;
}

const displayDailyQuiz = async () => {
  tabSound();
  resetNoticeboard();
  dailyQuizTab.classList.add("active-tab");
  noticeboard.classList.add("daily-quiz");

  noticeboard.innerHTML = "This is placeholder text until I have written this function"
}

const displayAbout = async () => {
  tabSound();
  resetNoticeboard();
  aboutTab.classList.add("active-tab");
  noticeboard.classList.add("about");

  noticeboard.innerHTML = "This is placeholder text until I have written this function"
}

// modal functions
const allTabs = document.querySelectorAll(".tab");
const allButtons = document.querySelectorAll(".button");

const openModal = function (buyOrDrink) {
  resetNoticeboard();
  noticeboard.innerHTML = modalHTML;
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const errorArea = document.querySelector("#error-div");
  const resultArea = document.querySelector("#result-div");
  noticeboard.classList.add("modal-style");
  allTabs.forEach(e => e.classList.add("hidden"));
  allButtons.forEach(e => e.classList.add("hidden"));
  errorArea.innerText = "";
  resultArea.innerText = "";
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const modalContent = document.getElementById("modal-content");
  let content;
  if (buyOrDrink == "buy") {
    content = `<h3>You bought milk!</h3>
  <input type="number" id="milk-qty" placeholder="enter amount" />
  <button id="toggle-units">Litres</button>`
  } else if (buyOrDrink == "drink") {
    content = `<h3>You drank milk!</h3>
  <input type="number" id="milk-qty" placeholder="enter number of drinks" />`
  }

  modalContent.innerHTML = content;

  const toggleUnitButton = document.getElementById("toggle-units");
  if (toggleUnitButton) {
    const toggleUnits = () => toggleUnitButton.innerText == "Litres" ? toggleUnitButton.innerText = "Pints" : toggleUnitButton.innerText = "Litres"
    toggleUnitButton.addEventListener("click", toggleUnits);
  };
  
};

const closeModal = function () {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  allTabs.forEach(e => e.classList.remove("hidden"));
  allButtons.forEach(e => e.classList.remove("hidden"));
};

const modalHandler = async () => {
  const numberInput = document.querySelector("#milk-qty");
  const milkQty = numberInput.value;
  const unitsButton = document.querySelector("#toggle-units");
  const units = unitsButton ? unitsButton.innerText : "moonits"
  const datePicker = document.querySelector("#transaction-date");
  const errorArea = document.querySelector("#error-div");
  const resultArea = document.querySelector("#result-div");

  // input error handling
  if (!datePicker.value || numberInput.value == 0) {
    errorArea.innerText = "Please enter valid values for quantity and date."
    return;
  }
  const stuff = {"qty": milkQty, "units": units, "date": datePicker.value}
  const route = units == "moonits" ? "/drink-milk" : "/buy-milk";

  const data = await fetch(route, {
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
  playConfettiSound();
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti({
    emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸', '🐄', '🐮', '🦡', '🥛', '💥', '💦', '🎉', '🎊', '🎉'],
    emojiSize: 30,
    confettiNumber: 100,
  });
  return; 

};


