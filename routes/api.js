const Converter = require('../components/converter.js');
const cowQuotes = require('../components/cowquotes.json');
const User = require('../models/user.model.js');

module.exports = function (app) {

    app.get("/login", (req, res) => {
        res.sendFile(process.cwd() + "/views/login.html");
      });
      
    app.get("/create-account", (req, res) => {
        res.sendFile(process.cwd() + "/views/account.html"); 
      });
      
    app.post("/authenticate", (req, res) => {
      // retrieve username and password from database
      });
     
    app.post("/create-new-user", async (req, res) => {
      const { username, password, security, botcheck } = req.body;
      console.log(req.body);
      
      // need to implement this properly!
      if (botcheck.replace(/[^A-Za-z0-9]/g, "").toLowerCase() !== "m231deb") {
        console.log("botcheck failed");
        return res.send({error: "Sorry, you failed the bot check. Please try again."});
      }

      // hash password and security answer/question here
      console.log("botcheck passed");
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
      
    app.get("/quote", (req, res) => {
        let randomQuote = cowQuotes.quotes[Math.floor(Math.random()*(cowQuotes.quotes.length))]
        res.send(randomQuote)
      });

    app.get("/forgot-password", (req, res) => {
        // use securityQuestion function from converter module
    })

    let converter = new Converter();
        
    // flesh this out... get updated balance
    app.route("/buy-milk")
      .post((req, res)=>{
        const {qty, units, date} = req.body;
        const dateString = converter.getDateString(date);
        const moonits = converter.convertToMoonits(qty, units);
        const transactionId = converter.transactionId(moonits);
        // save transactionid and update balance in database
        let balanceFromDatabase = 15;
        console.log(transactionId);

        return res.send({result: `You bought ${moonits} moonits on ${dateString}. You now have ${balanceFromDatabase+moonits} moonits.`})
      });

    app.route("/drink-milk")
      .post((req, res)=>{
        const {qty, date} = req.body;
        const dateString = converter.getDateString(date);
        const transactionId = converter.transactionId(qty);
        // save transactionid and update balance in database
        let balanceFromDatabase = 15;
        console.log(transactionId);

        return res.send({result: `You drank ${qty} moonits on ${dateString}. You now have ${balanceFromDatabase-qty} moonits.`})
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
      const userTransactions = ["-6d1730654468178", "10d1730654429573", "10d1730654358280"];
      const userBalance = 100;
      const transactionsArray = converter.transactionsObjects(userTransactions);
      return res.json({
        transactions: transactionsArray,
        balance: userBalance
      });
      });
}