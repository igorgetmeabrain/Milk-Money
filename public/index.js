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

/* HTML for modals */

const navbarModal = document.getElementById("navbar-modal");

const modalHTML = `<div class="flex">
    <audio src="audio/minimoo.mp3" preload="auto" id="minimoo"></audio>
    <img src="images/daycow.png" width="62px" height="70px" alt="mini cow logo" onclick="minimoo.play()"/>
    <h2 class="modal-header"></h2>
    <button class="modal-close-button">⨉</button>
    </div>`;

const modalHelpHTML = `<div id="help-form">
  <label for="help-select">Choose a help topic:</label>
  <select id="help-select">
    <option value="suggestion">Suggestion</option>
    <option value="question">Question</option>
    <option value="broken">Something Not Working</option>
    <option value="general">General</option>
  </select>
  <textarea id="help-text" placeholder="Type your message here..."></textarea>
  <button class="modal-button" id="modal-help-submit" onclick="navbarModalHandler('help')">Submit</button>
</div>`;

const modalSettingsHTML = `<div id="settings-form">
  <label for="icon-select">Choose your icon:</label>
  <div id="icon-select">
    <img src="images/icons/cowicon.png" alt="cow icon" class="icon" id="cowicon" onclick="selectIcon('cow')"/>
    <img src="images/icons/chickicon.png" alt="chick icon" class="icon" id="chickicon" onclick="selectIcon('chick')"/>
    <img src="images/icons/goaticon.png" alt="goat icon" class="icon" id="goaticon" onclick="selectIcon('goat')"/>
    <img src="images/icons/sheepicon.png" alt="sheep icon" class="icon" id="sheepicon" onclick="selectIcon('sheep')"/>
    <img src="images/icons/mouseicon.png" alt="mouse icon" class="icon" id="mouseicon" onclick="selectIcon('mouse')"/>
    <img src="images/icons/badgericon.png" alt="badger icon" class="icon" id="badgericon" onclick="selectIcon('badger')"/>
    <img src="images/icons/hedgehogicon.png" alt="hedgehog icon" class="icon" id="hedgehogicon" onclick="selectIcon('hedgehog')"/>
    <img src="images/icons/pigicon.png" alt="pig icon" class="icon" id="pigicon" onclick="selectIcon('pig')"/>
  </div>
  <label for="change-password">Change your password:</label>
  <input type="password" id="change-password" placeholder="new password" />
  <input type="password" id="confirm-password" placeholder="confirm new password" />
  <label for="new-security-question">Change your security question:</label>
  <select id="new-security-question">
    <option value=1>Your least favourite composer?</option>
    <option value=2>Musical instrument you would uninvent?</option>
    <option value=3>Your most annoying earworm?</option>
    <option value=4>Most over-rated musician?</option>
  </select>
  <input type="text" id="new-security-answer" placeholder="please type your answer" required>
  <label for="current-password">Enter current password to confirm:</label>
  <input type="password" id="current-password" placeholder="current password" />
  <button class="modal-button" id="modal-settings-submit" onclick="navbarModalHandler('settings')">Save</button>
</div>
<a id="logout" href="/logout">Log out</a>`;

const modalFunctionHTML = `
  <div id="modal-content"></div>
  <input type="date" id="transaction-date">
  <button class="modal-button" id="modal-submit" onclick="modalHandler()">Submit</button>
  <div id="result-div"><span id="result-text" class="hidden"></span></div>
</div>`;

function openNavbarModal(settingsOrHelp) {
  
  if (settingsOrHelp == 'help') {
    navbarModal.style.left ="66vw";
    navbarModal.innerHTML = modalHTML + modalHelpHTML;
    document.querySelector(".modal-header").innerText = "Help!";
  } else if (settingsOrHelp == 'settings') {
    navbarModal.style.left ="2%";
    navbarModal.innerHTML = modalHTML + modalSettingsHTML;
    document.querySelector(".modal-header").innerText = "Settings!";
  }

  navbarModal.classList.toggle("hidden");
  const closeButton = document.querySelector(".modal-close-button");
  closeButton.addEventListener("click", closeNavbarModal);
  
};

const selectIcon = (icon) => {
  document.querySelectorAll(".icon").forEach(e => e.style.border = "none");
  document.getElementById(`${icon}icon`).style.border = "4px solid darkgreen";
  let selectedIcon = icon;
  console.log('you have selected the ' + selectedIcon + ' icon');
}

const closeNavbarModal = function () {
  navbarModal.classList.add("hidden");
  navbarModal.innerHTML = "";
};

const navbarModalHandler = async () => {
  console.log("navbar modal handler")
  // retrieve form information and update database
};

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

};

function cowfetti(cowfettiType, size, number) {
  confettiSound.currentTime = 0;
  confettiSound.play();
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti({
    emojis: cowfettiType,
    emojiSize: size,
    confettiNumber: number,
  });
};

// button functions

async function needMilk() {
  // add catch error message
  const data = await fetch("/need-milk")
  const parsed = await data.json()
  
  let results = parsed.names.length == 1 
  ? `It is ${parsed.names[0]}'s turn to buy milk today!`
  : `It is either ${parsed.names[0]}'s or ${parsed.names[1]}'s turn to buy milk today. <br> Have some cowfetti!`

  theCowSpeaks([results, moo]);
  cowfetti(['🐄', '🐮', '🦡', '🥛'], 75, 50);

};

async function ruminate() {
  cowbell.currentTime = 0;
  cowbell.play();
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
  navbarModal.classList.add("hidden");
  cowbell.currentTime = 0;
  cowbell.play();
  resetNoticeboard();
  noticeboard.innerHTML = `<div id="modal">` + modalHTML + modalFunctionHTML + `</div>`;
  const overlay = document.querySelector(".overlay");
  noticeboard.classList.add("modal-style");
  allTabs.forEach(e => e.classList.add("hidden"));
  allButtons.forEach(e => e.classList.add("hidden"));
  overlay.classList.remove("hidden");
  const modalContent = document.getElementById("modal-content");
  let content;
  if (buyOrDrink == "buy") {
    content = `<input type="number" id="milk-qty" placeholder="amount in pints/litres" />
  <button id="toggle-units">Litres</button>`
    document.querySelector(".modal-header").innerText = "You Bought Milk!";
  } else if (buyOrDrink == "drink") {
    content = `<input type="number" id="milk-qty" placeholder="number of drinks" />`
    document.querySelector(".modal-header").innerText = "You Drank Milk!";
  }

  modalContent.innerHTML = content;

  const toggleUnitButton = document.getElementById("toggle-units");
  if (toggleUnitButton) {
    const toggleUnits = () => toggleUnitButton.innerText == "Litres" ? toggleUnitButton.innerText = "Pints" : toggleUnitButton.innerText = "Litres"
    toggleUnitButton.addEventListener("click", toggleUnits);
  };

  const closeButton = document.querySelector(".modal-close-button");
  closeButton.addEventListener("click", closeModal);
  
};

const closeModal = function () {
  const modal = document.getElementById("modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.add("hidden");
  modal.innerHTML = "";
  overlay.classList.add("hidden");
  allTabs.forEach(e => e.classList.remove("hidden"));
  allButtons.forEach(e => e.classList.remove("hidden"));
};

const modalHandler = async () => {

  const submitButton = document.getElementById("modal-submit");
  const numberInput = document.querySelector("#milk-qty");
  const milkQty = numberInput.value;
  const unitsButton = document.querySelector("#toggle-units");
  const units = unitsButton ? unitsButton.innerText : "moonits"
  const datePicker = document.querySelector("#transaction-date");
  const resultArea = document.querySelector("#result-text");
  const resultDiv = document.querySelector("#result-div");
  const inputs = document.querySelectorAll("input");

  // display result area
  resultArea.classList.remove("hidden");
  resultDiv.classList.add("result-div");

  // check for empty or invalid inputs
  if (!datePicker.value || numberInput.value <= 0 || Date.parse(datePicker.value) > Date.now()) {
    //console.log(Date.parse(datePicker.value), Date.now())
    resultArea.innerText = "Please enter valid values for quantity and date."
    inputs.forEach(e => e.value = "");
    return;
  }
  
  submitButton.disabled = true;
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
    inputElements.forEach(e => e.value = "");
    return resultArea.innerText = parsed.error;
  }

  resultArea.innerText = parsed.result;
  cowfetti(['🌈', '⚡️', '💥', '✨', '💫', '🌸', '🐄', '🐮', '🦡', '🥛', '💥', '💦', '🎉', '🎊', '🎉'], 30, 100);
  return; 

};


