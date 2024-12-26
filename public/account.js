const submitButton = document.getElementById("submit");
const resultArea = document.querySelector("#result-text");
const resultDiv = document.querySelector("#result-div");

const submitAccountForm = async (username, password, security, botcheck) => {


  const stuff = { 
    "username": username,
    "password": password,
    "security": security,
    "botcheck": botcheck
  }

  const data = await fetch("/create-new-user", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(stuff)
    });

  const parsed = await data.json();
  console.log(JSON.stringify(parsed))
    if (parsed.error) {
      return resultArea.innerText = parsed.error;
    } else {
      return resultArea.innerText = parsed.message;
    }
    
}

const validate = (e) => {

  e.preventDefault();

  const inputs = document.querySelectorAll("input");
  inputs.forEach(el=>el.classList.remove("invalid-field"));

  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  const securityQuestion = document.querySelector("#security-question");
  const securityAnswer = document.querySelector("#security-answer");
  const security = securityQuestion.value + securityAnswer.value;
  const botcheck = document.querySelector("#bot-check");
  resultArea.classList.remove("hidden");
  resultDiv.classList.add("result-div");

  const errorMessages = [
    "this field is required",
    "username must be between 3 and 10 characters",
    "username must contain only alphanumeric characters and underscores",
    "password must be at least 8 characters",
    "password must contain at least one uppercase, one lowercase, one numeric and one special character",
    "passwords do not match"
  ]

  switch (true) {
    case username.value == "":
      resultArea.innerText = errorMessages[0];
      username.classList.add("invalid-field");
      break;
    case username.value.length < 3 || username.value.length>10:
      resultArea.innerText = errorMessages[1];
      username.classList.add("invalid-field");
      break;
    case !/^[a-zA-Z0-9_]+$/.test(username.value):
      resultArea.innerText = errorMessages[2];
      username.classList.add("invalid-field");
      break;
    case password.value == "":
      resultArea.innerText = errorMessages[0];
      password.classList.add("invalid-field");
      break;
    case password.value.length < 8:
      resultArea.innerText = errorMessages[3];
      password.classList.add("invalid-field");
      break;
    case /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password.value):
      resultArea.innerText = errorMessages[4];
      password.classList.add("invalid-field");
      break;
    case password.value !== document.querySelector("#confirm-password").value:
      resultArea.innerText = errorMessages[5];
      password.classList.add("invalid-field");
      break;
    case securityAnswer.value == "":
      resultArea.innerText = errorMessages[0];
      securityAnswer.classList.add("invalid-field");
      break;
    default:
      resultArea.innerText = "please wait...";
      setTimeout(() => {
        submitAccountForm(username.value, password.value, security, botcheck.value);
      }, 2000);
      break;
  }

}

submit.addEventListener("click", validate);