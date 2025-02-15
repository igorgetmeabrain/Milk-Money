const Converter = require('../components/converter.js');
const cowQuotes = require('../components/cowquotes.json');
const quizQuestions = require('../components/quizquestions.json');
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

module.exports = function (app) {

  // placeholder before implementing passport etc - ensure all routes redirect if unauthenticated
  let authenticated = true;

  // serve index.html if authenticated, otherwise redirect to user.html
  app.get("/", (req, res) => {
    if (authenticated) {
      res.sendFile(process.cwd() + "/views/index.html");
    } else {
      res.redirect("/user")
    }
  });

  app.get("/user", (req, res) => {
    res.sendFile(process.cwd() + "/views/user.html");
  });

  // submit login form  
  app.post("/login", (req, res) => {
    // retrieve username and password from database
    // compare with form data and redirect to index.html if correct
    const { username, password } = req.body;
    // placeholder
    res.json({message: `Welcome ${username} you are now logged in.`});
  });
     
  app.post("/create-new-user", async (req, res) => {
    const { username, password, security, botcheck } = req.body;

    if (botcheck.replace(/[^A-Za-z0-9]/g, "").toLowerCase() !== "m231deb") {
      console.log("botcheck failed");
      return res.send({error: "Sorry, you failed the bot check. Please try again."});
    }

    // check if username already exists in system
    // if not...
    // hash password and security answer/question here
    return res.send({message: "botcheck passed"});

    /*
    try {
      const user = await User.create(userObject)
    } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
    }
    */
      
    // return res.send({message: "you are now in the database"});
  });
      
  app.post("/reset-password", (req, res) => {
    // unhash security question and answer from database and compare with form data
    // if correct, change password
    // use securityQuestion function from converter module
    const { password, security } = req.body;
    res.json({message: `Your password has been reset to ${password}. Your security code is ${security}`});
  });

  // handle logout properly
  app.post("/logout", (req, res) => {
    res.json({message: "You are now logged out."});
  });

  app.post("/navbar-help", (req, res) => {
    // send req.body back to check if it is working
    console.log(req.body);
    res.json({result: "You have requested help."});
  });

  app.post("/navbar-settings", (req, res) => {
    // send req.body back to check if it is working
    console.log(req.body);
    res.json({result: "You have requested settings."});
  });

  app.get("/quote", (req, res) => {
      let randomQuote = cowQuotes.quotes[Math.floor(Math.random()*(cowQuotes.quotes.length))]
      res.send(randomQuote)
  });

  // user functions
  let converter = new Converter();
        
  // flesh this out... get updated balance
  app.route("/buy-milk")
    .post((req, res)=>{
        const {qty, units, date} = req.body;
        const dateString = converter.getDateString(date);
        const moonits = converter.convertToMoonits(qty, units);
        const transactionId = converter.transactionId(moonits, "b");
        // save transactionid and update balance in database and update leaderboard
        let balanceFromDatabase = 15;
        console.log(transactionId);

        return res.send({result: `You bought ${moonits} moonits on ${dateString}.
          You now have ${balanceFromDatabase+moonits} moonits.`})
  });

  app.route("/drink-milk")
    .post((req, res)=>{
        const {qty, date} = req.body;
        const dateString = converter.getDateString(date);
        const transactionId = converter.transactionId(qty, "d");
        // save transactionid and update balance in database and update leaderboard
        let balanceFromDatabase = 15;
        console.log(transactionId);

        return res.send({result: `You drank ${qty} moonits on ${dateString}.
          You now have ${balanceFromDatabase-qty} moonits.`})
  });
    
  // placeholder object - will be retrieved from database
  app.route("/leaderboard")
  .get((req, res) => {
        return res.json({leaderboard: [
          {name: "Doug", balance: 33},
          {name: "Mimi", balance: 20},
          {name: "Alison", balance: 3},
          {name: "Reuben", balance: 0},
          {name: "Alex", balance: -10}
         ]})
  });

  // get team leaderboard from database
  // retrieve the lowest balance(s) and return name(s)
  app.route("/need-milk")
  .get((req, res) => {
        return res.json({names: ["Doug", "Reuben"]})
  });

  app.route("/user-balance")
  .get((req, res) => {
      // user.transactions and user.balance from database
      const userTransactions = ["6d1730654468178", "10b1730654429573", "10b1730654358280"];
      const userBalance = 100;
      const transactionsArray = converter.transactionsObjects(userTransactions);
      return res.json({
        transactions: transactionsArray,
        balance: userBalance
      });
  });

  app.route("/daily-quiz")
  .get((req, res) => {
    // check if user has already taken quiz today (check user object for date of last quiz) [datestamp, score] e.g.
    let hasTakenQuiz = false;

    if (hasTakenQuiz) {
      return res.json({completed: true, message: "You have already taken the quiz today.<br>Please come back tomorrow!"});
    } else {
      return res.json({completed: false, message: "You have not taken the quiz today.<br>Would you like to start now?"});
    }
  });

  app.route("/start-quiz")
    .get((req, res) => {
      // FETCH QUIZ QUESTIONS
      // check if today's questions are already in database
      // if so...
        // retrieve [datestamp, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] e.g.
        // generate quizQuestions object and return
      // if not...
        // save old questions to database array of asked questions
        // create new datestamped database array for today's questions
        let quizArray = ["datestamp", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // generate quizQuestions object and return
      let quizQuestions = {"questions": [{"question": "this is a question"}]};
      return res.json(quizQuestions);
    });

}