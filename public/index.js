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
const transactionsTab = document.getElementById("tab-3");
const aboutTab = document.getElementById("tab-4");
const tabContent = document.getElementById("noticeboard");

function tabSound() {
  cowpat.currentTime = 0;
  cowpat.play();
}

const renderLeaderBoardAsHTML = (leaderboard) => {
  let HTMLString = `
  <h2>Leaderboard</h2>
  <h4>Rank Name Moonits</h4>
  <ol id="numbered-list">`
  leaderboard.forEach(o => HTMLString += `<li>${o.name} ${o.balance}</li>`)
  HTMLString += `</ol>`
  console.log(HTMLString)
  return HTMLString;
}

const displayLeaderboard = async () =>  {

  tabSound();
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach(e => e.classList.remove("active-tab"));
  leaderboardTab.classList.add("active-tab");
  noticeboard.classList.remove("leaderboard", "moonit-balance", "transactions", "my-account-tab");
  noticeboard.classList.add("leaderboard");

  const data = await fetch("/leaderboard");

  const parsed = await data.json();
  if (parsed.error) {
    tabContent.innerText = JSON.stringify(parsed);
    return;
  }

  tabContent.innerHTML = renderLeaderBoardAsHTML(parsed.leaderboard);
  return; 
};

const displayBalance = async () => {
  tabSound();
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach(e => e.classList.remove("active-tab"));
  balanceTab.classList.add("active-tab");
  noticeboard.classList.remove("leaderboard", "moonit-balance", "transactions", "my-account-tab");
  noticeboard.classList.add("moonit-balance");

  tabContent.innerHTML = "This is placeholder text until I have written this function"
}

const displayTransactions = async () => {
  tabSound();
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach(e => e.classList.remove("active-tab"));
  transactionsTab.classList.add("active-tab");
  noticeboard.classList.remove("leaderboard", "moonit-balance", "about");
  noticeboard.classList.add("transactions");

  tabContent.innerHTML = "This is placeholder text until I have written this function"
}

const displayAbout = async () => {
  tabSound();
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach(e => e.classList.remove("active-tab"));
  aboutTab.classList.add("active-tab");
  noticeboard.classList.remove("leaderboard", "moonit-balance", "transactions");
  noticeboard.classList.add("about");

  tabContent.innerHTML = "This is placeholder text until I have written this function"
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
  const units = unitsButton ? unitsButton.innerText : "no units button"
  const datePicker = document.querySelector("#transaction-date");
  // converts e.g. '2024-10-25' to 'Fri 25 Oct 2024'
  const dateString = new Date(datePicker.value).toLocaleDateString(undefined, {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'}).split(",").join("");
  
  const stuff = {"qty": milkQty, "units": units, "date": dateString}

  console.log(units)
  const route = units == "no units button" ? "/drink-milk" : "/buy-milk";

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


