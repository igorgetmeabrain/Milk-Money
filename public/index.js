const dayNightCheckbox = document.getElementById("day-night-checkbox");
const cowImage = document.getElementById("cow");
const speechBubble = document.getElementById("speech-bubble");
const speechText = document.getElementById("cow-speech");
const noticeboard = document.getElementById("noticeboard");
const moo = document.getElementById("moo");
const cowbell = document.getElementById("cowbell");
const cowpat = document.getElementById("cowpat");
const clouds = document.querySelectorAll(".cloud");
const whatTheCowSays = [
  "Mooooooooooo!", 
  "Hey, who turned off all the lights?<br>Brrr, I'm freisian!", 
  "Oh, What a beautiful Mooooorning!", 
  "Hey, quit poking me, that's mooolestation!", 
  "Oi, don't make me hoof it over there - you'll udderly regret it!"
];
let isItDaytime = true;


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
  // fetch random quote
  const randomQuote = await fetch("/quote")
  const parsed = await randomQuote.json()
  theCowSpeaks(`Oh dear.<br>Perhaps this observation from ${parsed.author} will help:<br>"${parsed.quote}".`)
}

// tab functions
const leaderboardTab = document.getElementById("tab-1");
const balanceTab = document.getElementById("tab-2");
const dailyQuizTab = document.getElementById("tab-3");
const aboutTab = document.getElementById("tab-4");
const noticeboardContent = document.getElementById("noticeboard");

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

// incorporate codepen totaliser here
const balanceHTML = (transactions, balance) => {
  let HTMLString = `
  <div id="totaliser"></div>
  <div id="balance-text">
    <h2>Your Moonit Balance</h2>
    <h3>You have ${balance} moonits!</h3>
    <p>Your recent transactions:</p>
    <ul>`
  transactions.forEach(t=>HTMLString += `<li>${t.moonits} on ${t.date}</li>`);
  HTMLString += `
    </ul>
  </div>`;

  console.log(HTMLString);
  return HTMLString;
}

const displayLeaderboard = async () =>  {

  tabSound();
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach(e => e.classList.remove("active-tab"));
  leaderboardTab.classList.add("active-tab");
  noticeboard.classList.remove("leaderboard", "moonit-balance", "daily-quiz", "about");
  noticeboard.classList.add("leaderboard");

  const data = await fetch("/leaderboard");

  const parsed = await data.json();
  if (parsed.error) {
    noticeboardContent.innerText = JSON.stringify(parsed);
    return;
  }

  noticeboardContent.innerHTML = leaderboardHTML(parsed.leaderboard);
  return; 
};

// functions for totaliser display
function fillScaleElement(i) {
  setTimeout(function() { 
    document.getElementById(`${i}`).style.background = `hsl(${i+50}, 70%, 50%)`;
    document.getElementById("counter").innerText = `${Math.round(i/4)}`;
  }, i<0 ? -10*i : 10*i)
  
}

const fillTotaliser = (total) => {
  const negPos = total<0 ? -1 : 1 
  for (let i=total<0 ? 1 : 0; i<total*4*negPos; i++) {
    fillScaleElement(i*negPos)
  }
};

const displayBalance = async () => {
  
  tabSound();
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach(e => e.classList.remove("active-tab"));
  balanceTab.classList.add("active-tab");
  noticeboard.classList.remove("leaderboard", "daily-quiz", "about");
  noticeboard.classList.add("moonit-balance");

  const data = await fetch("/user-balance");
  console.log(data);

  const parsed = await data.json();
  if (parsed.error) {
    tabContent.innerText = JSON.stringify(parsed);
    return;
  }
  

  // need to deal with min (-20) max (24) values and confetti
  noticeboardContent.innerHTML = balanceHTML(parsed.transactions, parsed.balance);
  const totaliser = document.getElementById("totaliser");
  
  // create document fragment and populate
  let fragment = document.createDocumentFragment();
  let div, counter, button, posEls = 96, negEls = 80;
  for (let i=0; i<=posEls; i++) {
   div = document.createElement("div")
   div.className = "scale"
   div.id = `${posEls-i}`
   fragment.appendChild(div)
  }

  const zero = document.createElement("hr");
  fragment.appendChild(zero);

  for (let i=0; i<=negEls; i++) {
    div = document.createElement("div")
    div.className = "scale"
    div.id = `${-1-i}`
    fragment.appendChild(div)
  }
  counter = document.createElement("p")
  counter.innerText = "0";
  fragment.appendChild(counter).id = "counter";
  button = document.createElement("button")
  fragment.appendChild(button).id = "refresh-button"
  button.onclick = fillTotaliser(parsed.balance)
  button.innerText = "Refresh"

  totaliser.appendChild(fragment)
  return;
}

const displayDailyQuiz = async () => {
  tabSound();
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach(e => e.classList.remove("active-tab"));
  dailyQuizTab.classList.add("active-tab");
  noticeboard.classList.remove("leaderboard", "moonit-balance", "about");
  noticeboard.classList.add("daily-quiz");

  noticeboardContent.innerHTML = "This is placeholder text until I have written this function"
}


const displayAbout = async () => {
  tabSound();
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach(e => e.classList.remove("active-tab"));
  aboutTab.classList.add("active-tab");
  noticeboard.classList.remove("leaderboard", "moonit-balance", "daily-quiz");
  noticeboard.classList.add("about");

  noticeboardContent.innerHTML = "This is placeholder text until I have written this function"
}

// modal functions
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const openModal = function (buyOrDrink) {
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
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const closeModalBtn = document.querySelector(".btn-close");
const modalSubmit = document.querySelector("#modal-submit");

const modalHandler = async () => {

  const errorArea = document.querySelector("#error-div");
  const resultArea = document.querySelector("#result-div"); 
  const numberInput = document.querySelector("#milk-qty");
  const milkQty = numberInput.value;
  const unitsButton = document.querySelector("#toggle-units");
  const units = unitsButton ? unitsButton.innerText : "moonits"
  const datePicker = document.querySelector("#transaction-date");
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
  return; 

};

modalSubmit.addEventListener("click", modalHandler);
closeModalBtn.addEventListener("click", closeModal);


