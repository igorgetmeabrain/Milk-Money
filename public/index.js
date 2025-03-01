/* RETRIEVE PAGE ELEMENTS */
const dayNightCheckbox = document.getElementById("day-night-checkbox");
const cowImage = document.getElementById("cow");
const speechBubble = document.getElementById("speech-bubble");
const speechText = document.getElementById("cow-speech");
const noticeboard = document.getElementById("noticeboard");
const clouds = document.querySelectorAll(".cloud");
const navbarModal = document.getElementById("navbar-modal");

// show current date in footer
const footerDate = document.querySelector('.footer-date');
footerDate.innerText = new Date().toDateString();

/* AUDIO CLIPS */
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
let isItDaytime = true;
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
  if (mootype) {mootype.play()};
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
    navbarModal.style.color = "#999999";
  
    theCowSpeaks(Math.random() < 0.5 ? whatTheCowSays[0] : whatTheCowSays[1]);
  } else {
    isItDaytime = true;
    cowImage.src = "images/daycow.png";
    clouds.forEach(cloud => cloud.style.backgroundColor = "hsla(0, 0%, 100%, 0.9)");
    noticeboard.style.backgroundColor = "#f2f2f2";
    speechText.style.color = "black";
    navbarModal.style.backgroundColor = "#999999";
    navbarModal.style.color = "black";
    theCowSpeaks(whatTheCowSays[2]);
  }
}

function mootButton() {
  document.querySelectorAll("audio").forEach((elem) => elem.muted == true ? elem.muted = false : elem.muted = true);
  document.getElementById("moot-button").classList.toggle("fa-volume-up")
  document.getElementById("moot-button").classList.toggle("fa-volume-mute")
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

/* HTML FOR MODALS */
const modalHTML = `<div class="flex">
    <audio src="audio/minimoo.mp3" preload="auto" id="minimoo"></audio>
    <img src="images/daycow.png" width="62px" height="70px" alt="mini cow logo" onclick="minimoo.play()"/>
    <h2 class="modal-header"></h2>
    <button class="modal-close-button">⨉</button>
    </div>`;

const modalHelpHTML = `<div id="help-form">
  <label for="help-select">Choose a help topic:</label>
  <select id="help-select">
    <option value=0>Please select...</option>
    <option value="suggestion">Suggestion</option>
    <option value="question">Question</option>
    <option value="broken">Something Broken</option>
    <option value="other">Something Else</option>
  </select>
  <textarea id="help-text" placeholder="Type your message here..."></textarea>
  <div id="help-result-div"><span id="help-result-text" class="hidden"></span></div>
  <button class="navbar-modal-button" id="modal-help-submit" onclick="navbarModalHandler('help')">Submit</button>
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
    <img src="images/icons/duckicon.png" alt="duck icon" class="icon" id="duckicon" onclick="selectIcon('duck')"/>
    <img src="images/icons/bunnyicon.png" alt="bunny icon" class="icon" id="bunnyicon" onclick="selectIcon('bunny')"/>
  </div>
  <label for="change-password">Change your password:</label>
  <input type="password" id="change-password" placeholder="new password" />
  <input type="password" id="confirm-password" placeholder="confirm new password" />
  <label for="new-security-question">Change your security question:</label>
  <select id="new-security-question">
    <option value=0>Please select...</option>
    <option value=1>Your least favourite composer?</option>
    <option value=2>Musical instrument you would uninvent?</option>
    <option value=3>Your most annoying earworm?</option>
    <option value=4>Most over-rated musician?</option>
  </select>
  <input type="text" id="new-security-answer" placeholder="please type your answer" required>
  <label for="current-password">Enter current password to confirm:</label>
  <input type="password" id="current-password" placeholder="current password" />
  <div id="settings-result-div"><span id="settings-result-text" class="hidden"></span></div>
  <button class="navbar-modal-button" id="modal-settings-submit" onclick="navbarModalHandler('settings')">Save Changes</button>
</div>
<a id="logout" href="/logout">Log out</a>`;

const modalFunctionHTML = `
  <div id="modal-content"></div>
  <input type="date" id="transaction-date">
  <div id="result-div"><span id="result-text" class="hidden"></span></div>
  <button class="modal-button" id="modal-submit" onclick="modalHandler()">Submit</button>
</div>`;

/* NAVBAR MODAL FUNCTIONS */
function openNavbarModal(settingsOrHelp) {
  
  if (settingsOrHelp == 'help') {
    navbarModal.style.left ="66vw";
    navbarModal.innerHTML = modalHTML + modalHelpHTML;
    document.querySelector(".modal-header").innerText = "Help";
  } else if (settingsOrHelp == 'settings') {
    navbarModal.style.left ="2%";
    navbarModal.innerHTML = modalHTML + modalSettingsHTML;
    document.querySelector(".modal-header").innerText = "Settings";
  }

  navbarModal.classList.toggle("hidden");
  const closeButton = document.querySelector(".modal-close-button");
  closeButton.addEventListener("click", closeNavbarModal);
  
};

const selectIcon = (icon) => {
  document.querySelectorAll(".icon").forEach(e => e.classList.remove("selected-icon"));
  document.getElementById(`${icon}icon`).classList.add("selected-icon");
  console.log('you have selected the ' + icon + ' icon');
};

const closeNavbarModal = function () {
  navbarModal.classList.add("hidden");
  navbarModal.innerHTML = "";
};

const navbarModalHandler = async (helpOrSettings) => {

  // need to add result area to modal to return error/success messages
  const resultDiv = document.querySelector(`#${helpOrSettings}-result-div`);
  const resultText = document.querySelector(`#${helpOrSettings}-result-text`);

  // show result area
  resultDiv.classList.add("result-div");
  resultText.classList.remove("hidden");
  const stuff = {};

  if (helpOrSettings == "help") {
    const type = document.getElementById("help-select").value;
    const text = document.getElementById("help-text").value;
    
    // validate inputs
    if (type == "0") {
      return resultText.innerText = "please select a help topic";
    } else if (!text) {
      return resultText.innerText = "please enter a message";
    } else {
      resultText.innerText = "please wait...";
    }

    stuff.type = type;
    stuff.text = text;

  } else if (helpOrSettings == "settings") {
    const securityQuestion = document.getElementById("new-security-question").value;
    const securityAnswer = document.getElementById("new-security-answer").value;
    const security = securityQuestion != "0" && securityAnswer ? securityQuestion + securityAnswer : null;
    const icon = document.querySelector(".selected-icon") ? document.querySelector(".selected-icon").alt.replace(" icon", "") : null;
    const password = document.getElementById("change-password").value || null;
    const confirmPassword = document.getElementById("confirm-password").value || null;
    const currentPassword = document.getElementById("current-password").value || null;
    
    stuff.icon = icon;
    stuff.password = password;
    stuff.security = security;
    stuff.currentPassword = currentPassword;

    // validate inputs
    switch (true) {
      case (securityAnswer && securityQuestion == "0"):
        resultText.innerText = "please select a security question";
        break;
      case (securityQuestion != "0" && !securityAnswer):
        resultText.innerText = "please provide a security answer";
        break;
      case Object.keys(stuff).every(e => !stuff[e]):
        resultText.innerText = "you have not made any changes";
        break;
      case currentPassword && !icon && !password && !security:
        resultText.innerText = "you have not made any changes";
        break;
      case password !== confirmPassword:
        resultText.innerText = "passwords do not match";
        break;
      case password && password.length < 8:
        resultText.innerText = "password must be at least 8 characters";
        break;
      case password && /^([^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password):
        resultText.innerText = "password must contain at least one uppercase, one lowercase, one numeric and one special character";
        break;
      case !currentPassword:
        resultText.innerText = "please enter your password to confirm changes";
        break;
      default:
        resultText.innerText = "please wait...";
    }

  } else {
    // return as modal message
    return console.log("form type invalid");
  }

  // now disable submit button and submit form data (including null values)
  if (resultText.innerText == "please wait...") {
    const submitButton = document.querySelector(`#modal-${helpOrSettings}-submit`);
    submitButton.disabled = true;
    const data = await fetch(`/navbar-${helpOrSettings}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(stuff)
    });

    const parsed = await data.json();
    resultText.innerText = parsed.result;
    return;
  } else {
    // failsafe in case of bad logic
    console.log("validation fault?");
  }

};

/* BUTTON FUNCTIONS */
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
};

/* TAB FUNCTIONS */
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
  leaderboardTab.style.background = "seagreen";
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

/* FUNCTION FOR TOTALISER DISPLAY */
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
  balanceTab.style.background = "blue";
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

/* QUIZ FUNCTIONS */

// how to make questions globally available?

let score = 0, questionNo = 0, askAltQuestion = false;

const startQuizHTML = `
<h2 id="quiz-header">Daily Quiz</h2>
<p id="message-text"></p>
<button id="start-quiz-btn" class="quiz-button" onclick="startQuiz()" class="hidden">Start Quiz</button>`;

const playQuizHTML = `
  <div id="quiz-container">
    <h2 id="question-header"></h2>
    <div id="imageoraudio-container"> 
      <img id="image-question">
      <audio id="audio-question" class="hidden" controls></audio>
      <p id="no-audio" class-"hidden">Can't listen now?</p>
    </div>
    <div id="answers"></div>
    <div id="navigation-buttons">
      <button id="next-question" class="quiz-nav-button">Next Question</button>
      <button id="finish-quiz" class="quiz-nav-button">Finish Quiz</button>
    </div>
  </div>`;

const displayDailyQuiz = async () => {
  tabSound();
  resetNoticeboard();
  dailyQuizTab.style.background = "red";
  noticeboard.classList.add("daily-quiz");
  const data = await fetch("/daily-quiz");
  const parsed = await data.json();
  if (parsed.error) {
    noticeboard.innerText = JSON.stringify(parsed);
    return;
  } else {
    noticeboard.innerHTML = startQuizHTML;
    document.getElementById("message-text").innerHTML = parsed.message;
    if (!parsed.completed) {
      document.getElementById("start-quiz-btn").classList.remove("hidden");
    };
    return;
  }
};

const startQuiz = async () => {

  document.getElementById("message-text").innerHTML = "Fetching quiz questions...<br>please wait...";
  document.getElementById("start-quiz-btn").disabled = "true";

  const data = await fetch("/start-quiz");
  const parsed = await data.json();
  if (parsed.error) {
    document.getElementById("message-text").innerText = JSON.stringify(parsed);
    return;
  } else {
    return playQuiz(parsed.questions);
  }
};

const playQuiz = (questionsArray) => {
  noticeboard.innerHTML = playQuizHTML;
  document.getElementById("next-question").addEventListener("click", () =>{askQuestion(questionsArray[questionNo])});
  askQuestion(questionsArray[0]);
};

const askQuestion = (questionObject) => {
  document.getElementById("finish-quiz").classList.add("hidden");
  document.getElementById("next-question").disabled = true;
  const {type, source, question, A, B, C, D, answer, blur=0, altquestion=false} = questionObject;
  const questionHeader = document.getElementById("question-header");
  const audioQuestion = document.getElementById("audio-question");
  const imageQuestion = document.getElementById("image-question");
  const noAudio = document.getElementById("no-audio");
  const answerDiv = document.getElementById("answers");
  const options = ["A", "B", "C", "D"];
  const answers = [A, B, C, D];

  questionHeader.textContent = `QUESTION ${questionNo+1}:`;
  theCowSpeaks([question, null]);
  
  // reset answerDiv and then add answer buttons and event listeners
  answerDiv.innerHTML = "";
  options.forEach((a, i)=>{
    const button = document.createElement("button");
    button.innerText = answers[i];
    button.value = options[i];
    button.classList.add("answer-btn");
    answerDiv.appendChild(button);
    button.addEventListener("click", () => {selectAnswer(button.value, answer)})
  });
   

  if (type === "audio" && !askAltQuestion) {
    audioQuestion.src = source;
    audioQuestion.classList.remove("hidden");
    noAudio.classList.remove("hidden");
    noAudio.addEventListener("click", () => {noAudioQuestions(altquestion)});
    imageQuestion.src="";
  } else if (type === "audio" && askAltQuestion) {
    questionText.textContent = altquestion;
    audioQuestion.src = source;
    audioQuestion.classList.add("hidden");
    imageQuestion.src="";
  } else if (type ==="image") {
    imageQuestion.src = source;
    imageQuestion.style.filter = `blur(${blur}px)`;
    audioQuestion.classList.add("hidden");
    noAudio.classList.add("hidden"); 
  } else if (type ==="text") {
    audioQuestion.classList.add("hidden");
    imageQuestion.src="";
    noAudio.classList.add("hidden");  
  }
  
  return;
};

const selectAnswer = (response, answer) => {
  const nextQuestionButton = document.getElementById("next-question");
  nextQuestionButton.disabled = false;
  document.querySelectorAll(".answer-btn").forEach(btn=>btn.disabled=true);
  document.getElementById("image-question").style.filter = "blur(0px)";
  
  if (response === answer) {
    score++;
    questionNo++;
    document.querySelector(`[value="${response}"]`).classList.add("correct-answer");
  } else {
    questionNo++;
    document.querySelector(`[value="${response}"]`).classList.add("incorrect-answer");
    document.querySelector(`[value="${answer}"]`).classList.add("correct-answer");
  }
  
  // trigger end of quiz with finish button
  if (questionNo>9) {
    // hide button and replace with finish button
    const finishQuizButton = document.getElementById("finish-quiz");
    nextQuestionButton.classList.add("hidden");
    finishQuizButton.classList.remove("hidden");
    finishQuizButton.addEventListener("click", () => {endQuiz(score)})
  }
}

const noAudioQuestions = (altquestion) => {
  document.getElementById("audio-question").classList.add("hidden");
  document.getElementById("no-audio").classList.add("hidden");
  document.getElementById("question-text").textContent = altquestion;
  askAltQuestion = true;
};

const endQuiz = async (score) => {
  document.getElementById("finish-quiz").disabled = true;
  console.log("you scored: ", score);
  // display message to user
  // post request to send score to user object
};

/* END OF QUIZ FUNCTIONS */

const aboutHTML = `
<div class="about-content">
  <h2>What is Moola?</h2>
  <p class="about-text">Moola monitors communal milk usage in a typical workplace.
  Its primary purpose is to calculate whose turn it is to replenish the communal milk supply!</p>
  <br>
  <h2>How does Moola work?</h2>
  <p class="about-text">Milk usage is calculated in Moonits.
  One Moonit is about the amount required for one hot drink.
  (Those who prefer it milkier may use two or more Moonits per drink).
  Every time you dip into or replenish the communal milk supply, you log it on Moola and your Moonit balance will be updated accordingly.
  You may also consult the Moonit leaderboard (or ask Moozart the cow) whose turn it is to buy the milk!</p>
  <br>
  <h2>What else can I do on Moola?</h2>
  <p class="about-text">There are a plethora of unnecessary features, so try clicking around and see what happens!
  There is even a Daily Quiz, to ponder whilst you sup your favourite beverage!</p>
  <br>
  <h2>Moola is not working!</h2>
  <p class="about-text">If you are having trouble with Moola, need help or have questions or suggestions, 
  please click the Help (?) icon above, to contact the Moola Mooverlords.</p>
  <br>
  <h2>CREDITS</h2>
  <span><a href="https://iconscout.com/free-icon/sheep-2283629" target="_blank">Sheep icon</a> by <a href="https://iconscout.com/contributors/vintagio" target="_blank">Dhimas Ronggobramantyo</a> on <a href="https://iconscout.com" target="_blank">IconScout</a></span>
  <span><a href="https://uk.pinterest.com/pin/10625749114908978" target="_blank">Moozart the cow</a> found moooching about on <a href="https://uk.pinterest.com" target="_blank">Pinterest</a></span>
  <span>Other icons created by <a href="https://www.flaticon.com/authors/freepik" target="_blank">Freepik - Flaticon</a></span>
</div>
`;

const displayAbout = () => {
  tabSound();
  resetNoticeboard();
  aboutTab.style.background = "purple";
  noticeboard.classList.add("about");
  noticeboard.innerHTML = aboutHTML;
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

window.addEventListener("load", (event) => {
  displayLeaderboards();
  console.log("page is fully loaded");
});