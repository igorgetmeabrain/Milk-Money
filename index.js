const dayNightCheckbox = document.getElementById("day-night");
const cowImage = document.getElementById("cow");
const speechBubble = document.getElementById("speech-container");
const speechText = document.getElementById("speech-text");


function dayNight() {
  if (dayNightCheckbox.checked) {
    cowImage.src = "images/nightcow.png"
    speechBubble.style.backgroundImage = "url(images/nightspeech.png)"
    speechText.style.color = "white";
    speechText.innerText = "Hey! Who turned off all the lights?"
  } else {
    cowImage.src = "images/daycow.png"
    speechBubble.style.backgroundImage = "url(images/dayspeech.png)"
    speechText.style.color = "black";
    speechText.innerText = "What a beautiful sunny day! Moooooo!"
  }
}

function theCowSpeaks() {
  
}


