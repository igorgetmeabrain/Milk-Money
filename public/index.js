const dayNightCheckbox = document.getElementById("day-night-checkbox");
const cowImage = document.getElementById("cow");
const speechBubble = document.getElementById("speech-bubble");
const speechText = document.getElementById("cow-speech");
const noticeboard = document.getElementById("noticeboard");
const clouds = document.querySelectorAll(".cloud");
let isItDaytime = true;

// audio clips
const moo = document.getElementById("moo");
const baa = document.getElementById("baa");
const goat = document.getElementById("goat");
const queen = document.getElementById("queen");
const cowbell = document.getElementById("cowbell");
const cowpat = document.getElementById("cowpat");
const confettiSound = document.getElementById("confetti");
const badger = document.getElementById("badger");
const milkPour = document.getElementById("milk-pour");
const milkPourUp = document.getElementById("milk-pour-up");
const navbarModal = document.getElementById("navbar-modal");

/* HOMEPAGE INTERACTION */

const whatTheCowSays = [
  ["Hey, who turned off all the lights? <br> Brrr, I'm friesian!", moo],
  ["The milky way is udderly beautiful! Do you think we're all alone in the mooniverse?", moo],
  ["Oh, What a beautiful Mooooorning!", moo],
  ["Moooooooooooo!", moo],
  ["Hey, quit poking me, that's mooolestation!", moo],
  ["Oi, don't make me hoof it over there <br> You'll udderly regret it!", moo],
  ["You're really getting my goat now!", goat],
  ["I'm feeling a little sheepish today...", baa],
  ["Moo-la la la Moo-la la la Moo-la la la Moo-la la la Moo-la la Moooo!", queen]
];

function theCowSpeaks(cowVocab) {
  const [mooing, mootype] = cowVocab
  whatTheCowSays.forEach(e=>{e[1].pause(); e[1].currentTime = 0})
  // check this line
  let fontSize = (2.2-mooing.length*0.01) < 0.9 ? 0.9 : (2.2-mooing.length*0.01)
  //console.log(mooing.length, fontSize, 2.2-mooing.length*0.01)
  speechText.style.fontSize = `${fontSize}rem`
  speechBubble.style.backgroundImage = isItDaytime ? "url(images/dayspeech.png)" : "url(images/nightspeech.png)";
  speechBubble.style.opacity = "1";
  mootype.play()
  speechText.innerHTML = mooing; 
};

function dayNight() {
  if (dayNightCheckbox.checked) {
    isItDaytime = false;
    cowImage.src = "images/nightcow.png";
    clouds.forEach(cloud => cloud.style.backgroundColor = "hsla(0, 0%, 20%, 0.9)");
    noticeboard.style.backgroundColor = "black";
    speechText.style.color = "white";
    navbarModal.style.backgroundColor = "black";
    navbarModal.style.color = "white";
  
    theCowSpeaks(Math.random() < 0.5 ? whatTheCowSays[0] : whatTheCowSays[1]);
  } else {
    isItDaytime = true;
    cowImage.src = "images/daycow.png";
    clouds.forEach(cloud => cloud.style.backgroundColor = "hsla(0, 0%, 100%, 0.9)");
    noticeboard.style.backgroundColor = "white";
    speechText.style.color = "black";
    navbarModal.style.backgroundColor = "white";
    navbarModal.style.color = "black";
    theCowSpeaks(whatTheCowSays[2]);
  }
}

function mootButton() {
  document.querySelectorAll("audio").forEach((elem) => elem.muted == true ? elem.muted = false : elem.muted = true);
  document.getElementById("moot-button").classList.toggle("fa-volume-up")
  document.getElementById("moot-button").classList.toggle("fa-volume-mute")
}

const helpHTML = `<h2>Help</h2>
                  `;
const settingsHTML = `<h2>Settings</h2>`;

function openNavbarModal(settingsOrHelp) {

  if (settingsOrHelp == 'help') {
    navbarModal.style.left ="66vw";
    navbarModal.innerHTML = helpHTML;
  } else if (settingsOrHelp == 'settings') {
    navbarModal.style.left ="2%";
    navbarModal.innerHTML = settingsHTML;
  }

  navbarModal.classList.toggle("hidden");
  
}

let cowPokeCount = 0;
function pokeTheCow() {

  let random = Math.floor(Math.random()*25);

  if (random == 24) {
    theCowSpeaks(whatTheCowSays[8])
  } else if (random < 2) {
    theCowSpeaks(whatTheCowSays[7])
  } else { 
    theCowSpeaks(cowPokeCount < 4 ? whatTheCowSays[3] : whatTheCowSays[cowPokeCount]);
  }

  return cowPokeCount >= 6 ? cowPokeCount = 0 : cowPokeCount++

}

function cowfetti(cowfettiType, size, number) {
  confettiSound.currentTime = 0;
  confettiSound.play();
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti({
    emojis: cowfettiType,
    emojiSize: size,
    confettiNumber: number,
  });
}

// button functions

function buttonSound() {
  cowbell.currentTime = 0;
  cowbell.play();
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
  // add catch error message
  const data = await fetch("/need-milk")
  const parsed = await data.json()
  
  let results = parsed.names.length == 1 
  ? `It is ${parsed.names[0]}'s turn to buy milk today!`
  : `It is either ${parsed.names[0]}'s or ${parsed.names[1]}'s turn to buy milk today. <br> Have some cowfetti!`

  theCowSpeaks([results, moo]);
  cowfetti(['🐄', '🐮', '🦡', '🥛'], 75, 50);

}

async function ruminate() {
  buttonSound()
  // add catch error message
  const randomQuote = await fetch("/quote")
  const parsed = await randomQuote.json()
  theCowSpeaks([`As ${parsed.author} once said, "${parsed.quote}".`, moo])
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

// submit button triggers modalHandler
const modalHTML = `<section class="modal hidden">
<div class="flex" id="modal">
<img src="images/daycow.png" width="62px" height="70px" alt="mini cow logo" />
<button class="btn-close" onclick="closeModal()">⨉</button>
</div>
<div id="modal-content"></div>
<input type="date" id="transaction-date">
<button class="btn" id="modal-submit" onclick="modalHandler()">Submit</button>
<div id="error-div"></div>
<div id="result-div"></div>
</section>`

const resetNoticeboard = () => {
  allTabs.forEach(e => e.style.background = "green");
  noticeboard.classList.remove("moonit-balance", "daily-quiz", "about", "modal-style", "leaderboard");
}

const displayLeaderboards = async () =>  {

  tabSound();
  resetNoticeboard();
  leaderboardTab.style.background = "blue";
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
  balanceTab.style.background = "red";
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
  dailyQuizTab.style.background = "darkorange";
  noticeboard.classList.add("daily-quiz");

  noticeboard.innerHTML = "This is placeholder text until I have written this function"
}

const displayAbout = async () => {
  tabSound();
  resetNoticeboard();
  aboutTab.style.background = "purple";
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
  errorArea.style.color = isItDaytime ? "black" : "white"
  resultArea.innerText = "";
  resultArea.style.color = isItDaytime ? "black" : "white"
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
    errorArea.innerText = parsed.error;
    return;
  }

  resultArea.innerText = parsed.result;
  cowfetti(['🌈', '⚡️', '💥', '✨', '💫', '🌸', '🐄', '🐮', '🦡', '🥛', '💥', '💦', '🎉', '🎊', '🎉'], 30, 100);
  return; 

};


