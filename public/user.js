const loginForm = document.getElementById('login-form');
const resetForm = document.getElementById('password-reset-form');
const accountForm = document.getElementById('account-form');

// show current date in footer
const footerDate = document.querySelector('.footer-date');
footerDate.innerText = new Date().toDateString();

const showPasswordResetForm = () => {
    resetForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
};

const showAccountForm = () => {
    accountForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
};

const submitFormHandler = async (formType, username, password, security, botcheck) => {
    
    // need to get the result area again
    const resultArea = document.querySelector(`#${formType}-result-text`);

    const stuff = {};

    if (username) stuff.username = username;
    if (password) stuff.password = password;
    if (security) stuff.security = security;
    if (botcheck) stuff.botcheck = botcheck;
    
    const route = formType === "login" ? "/login" : formType === "account" ? "/create-new-user" : "/reset-password";
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
        return resultArea.innerText = parsed.error;
      } else {
        return resultArea.innerText = parsed.message;
      }
      
};

const validate = (formType) => {

    if (formType !== "login" && formType !== "account" && formType !== "reset") {
        return console.log("invalid form type");
    };

    const resultArea = document.querySelector(`#${formType}-result-text`);
    const resultDiv = document.querySelector(`#${formType}-result-div`);
    const errorMessages = [
        "a required field is missing",
        "username must be between 3 and 10 characters",
        "username must contain only alphanumeric characters and underscores",
        "password must be at least 8 characters",
        "password must contain at least one uppercase, one lowercase, one numeric and one special character",
        "passwords do not match",
        "please select a security question"
    ];

    // reset invalid form field warnings
    const inputs = document.querySelectorAll("input");
    inputs.forEach(el=>el.classList.remove("invalid-field"));
    resultArea.innerText = "";

    // get form fields
    const username = document.querySelector(`#${formType}-username`);
    const password = document.querySelector(`#${formType}-password`);

    // account and reset only
    const confirmPassword = document.querySelector(`#confirm-${formType}-password`);
    const securityQuestion = document.querySelector(`#${formType}-security-question`);
    const securityAnswer = document.querySelector(`#${formType}-security-answer`);
    const security = securityQuestion && securityAnswer ? securityQuestion.value + securityAnswer.value : null;
        
    // account only
    const botcheck = document.querySelector("#bot-check");

    // display result area
    resultArea.classList.remove("hidden");
    resultDiv.classList.add("result-div");

    // validate form fields
    switch (true) {
      case formType == "account" && (username.value.length < 3 || username.value.length>10):
        resultArea.innerText = errorMessages[1];
        username.classList.add("invalid-field");
        break;
      case formType == "account" && !/^[a-zA-Z0-9_]+$/.test(username.value):
        resultArea.innerText = errorMessages[2];
        username.classList.add("invalid-field");
        break;
      case formType != "reset" && username.value == "":
        resultArea.innerText = errorMessages[0];
        username.classList.add("invalid-field");
        break;
      case password.value == "":
        resultArea.innerText = errorMessages[0];
        password.classList.add("invalid-field");
        break;
      case formType != "login" && password.value.length < 8:
        resultArea.innerText = errorMessages[3];
        password.classList.add("invalid-field");
        break;
      case formType != "login" && /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password.value):
        resultArea.innerText = errorMessages[4];
        password.classList.add("invalid-field");
        break;
      case formType != "login" && confirmPassword.value == "":
        resultArea.innerText = errorMessages[0];
        confirmPassword.classList.add("invalid-field");
        break;
      case formType != "login" && password.value !== confirmPassword.value:
        resultArea.innerText = errorMessages[5];
        password.classList.add("invalid-field");
        break;
      case formType != "login" && securityQuestion.value == "0":
        resultArea.innerText = errorMessages[6];
        break;
      case formType != "login" && securityAnswer.value == "":
        resultArea.innerText = errorMessages[0];
        securityAnswer.classList.add("invalid-field");
        break;
      case formType == "account" && botcheck.value=="":
        resultArea.innerText = errorMessages[0];
        botcheck.classList.add("invalid-field");
        break;
      default:
        resultArea.innerText = "please wait...";
        const user = username ? username.value : null;
        const pass = password ? password.value : null;
        const sec = security;
        const bot = botcheck? botcheck.value : null;

        // reset form fields
        inputs.forEach(e => e.value = "");
        securityQuestion ? securityQuestion.value = "0" : null;

        // disable submit button]
        const submitButton = document.querySelector(`#${formType}-submit`);
        submitButton.disabled = true;
          
        setTimeout(() => {
          console.log("submitting form");
          submitFormHandler(formType, user, pass, sec, bot);
        }, 2000);
      }
    
};



