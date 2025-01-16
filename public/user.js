const loginForm = document.getElementById('login-form');
const resetForm = document.getElementById('password-reset-form');
const accountForm = document.getElementById('account-form');

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

    if (username !== 0) stuff["username"] = username;
    if (password !== 0) stuff["password"] = password;
    if (security !== 0) stuff["security"] = security;
    if (botcheck !== 0) stuff["botcheck"] = botcheck;
    
    //console.log("stuff: ", stuff);
    
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
    //console.log(JSON.stringify(parsed))
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
        "this field is required",
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
    const security = securityQuestion != 0 ? securityQuestion.value + securityAnswer.value : null;
        
    // account only
    const botcheck = document.querySelector("#bot-check");

    // display result area
    resultArea.classList.remove("hidden");
    resultDiv.classList.add("result-div");

    // validate form fields
    switch (true) {
        case formType != "reset" && username.value == "":
          resultArea.innerText = errorMessages[0];
          username.classList.add("invalid-field");
          break;
        case formType == "account" && (username.value.length < 3 || username.value.length>10):
          resultArea.innerText = errorMessages[1];
          username.classList.add("invalid-field");
          break;
        case formType == "account" && !/^[a-zA-Z0-9_]+$/.test(username.value):
          resultArea.innerText = errorMessages[2];
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
          // ensure no fields are null before passing to submitFormHandler
          const user = username ? username.value : 0;
          const pass = password.value ? password.value : 0;
          const sec = security ? security : 0;
          const bot = botcheck.value ? botcheck.value : 0;

          // reset form fields
          inputs.forEach(e => e.value = "");
          securityQuestion ? securityQuestion.value = "0" : null;
          
          setTimeout(() => {
            console.log("submitting form");
            //console.log("\nform type: ", formType, "\nusername: ", user, "\npassword: ", pass, "\nsecurity: ", sec, "\nbotcheck: ", bot);
            submitFormHandler(formType, user, pass, sec, bot);
          }, 2000);
          break;
      }
    
};



