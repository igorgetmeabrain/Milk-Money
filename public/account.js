const submitAccountForm = async (e) => {

    //e.preventDefault();

    // document queries for form elements here
    const resultArea = document.querySelector("#result-div");
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const securityQuestion = document.querySelector("#security-question").value;
    const securityAnswer = document.querySelector("#security-answer").value;
    const security = securityQuestion + securityAnswer;
    const botcheck = document.querySelector("#bot-check").value;

    // populate with form elements
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