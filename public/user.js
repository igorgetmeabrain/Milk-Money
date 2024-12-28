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

    const stuff = { 
    // customise for form type
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
        "passwords do not match"
    ];

    // reset invalid form field warnings
    const inputs = document.querySelectorAll("input");
    inputs.forEach(el=>el.classList.remove("invalid-field"));
    resultArea.innerText = "";

    // get form fields
    const username = document.querySelector(`#${formType}-username`);
    const password = document.querySelector(`#${formType}-password`);

    // account and reset fields
    if (formType != "login") {
        // variables out of scope....
        const confirmPassword = document.querySelector(`#confirm-${formType}-password`);
        const securityQuestion = document.querySelector(`#${formType}-security-question`);
        const securityAnswer = document.querySelector(`#${formType}-security-answer`);
        const security = securityQuestion.value + securityAnswer.value;
        
        // account only
        if (formType != "reset") {
            const botcheck = document.querySelector(`#bot-check`);
        }    
    }

    // display result area
    resultArea.classList.remove("hidden");
    resultDiv.classList.add("result-div");

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
        case formType == "account" && password.value.length < 8:
          resultArea.innerText = errorMessages[3];
          password.classList.add("invalid-field");
          break;
        case formType == "account" && /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password.value):
          resultArea.innerText = errorMessages[4];
          password.classList.add("invalid-field");
          break;
        case formType != "login" && password.value !== confirmPassword.value:
          resultArea.innerText = errorMessages[5];
          password.classList.add("invalid-field");
          break;
        case formType != "login" && securityAnswer.value == "":
          resultArea.innerText = errorMessages[0];
          securityAnswer.classList.add("invalid-field");
          break;
        default:
          resultArea.innerText = "please wait...";
          setTimeout(() => {
            console.log("submitting form");
            // customise for each form type allowing for undefined parameters
            // submitFormHandler(formType, username.value, password.value, security, botcheck.value);
          }, 2000);
          break;
      }
    
}



