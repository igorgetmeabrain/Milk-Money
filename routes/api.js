const Converter = require('../components/moonit_converter.js');
const cowQuotes = require('../components/cowquotes.json');

module.exports = function (app) {

    app.get("/login", (req, res) => {
        res.sendFile(__dirname + "/views/login.html");
      });
      
    app.get("/create-account", (req, res) => {
        res.sendFile(__dirname + "/views/account.html");
      });
      
    /* 
    app.get("/create-new-user", (req, res) => {
      });
    */
      
    app.get("/quote", (req, res) => {
        let randomQuote = cowQuotes.quotes[Math.floor(Math.random()*(cowQuotes.quotes.length))]
        res.send(randomQuote)
    });

    let converter = new Converter();
        
    // flesh this out... get updated balance
    app.route("/buy-milk")
      .post((req, res)=>{
        const {qty, units, date} = req.body;
        const dateString = converter.getDateString(date);
        const moonits = converter.convertToMoonits(qty, units);
        const transactionId = converter.transactionId(moonits, date);
        // save transactionid and update balance in database
        let balanceFromDatabase = 15;
        console.log(transactionId);

        return res.json({result: `You bought ${moonits} moonits on ${dateString}. You now have ${balanceFromDatabase+moonits} moonits.`})
      });

    app.route("/drink-milk")
      .post((req, res)=>{
        const {qty, date} = req.body;
        const dateString = converter.getDateString(date);
        const transactionId = converter.transactionId(qty, date);
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