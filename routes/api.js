const Converter = require('../components/moonit_converter.js');
const cowQuotes = require('../components/cowquotes.json');

module.exports = function (app) {

    const converter = new Converter();

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
        
    // flesh this out... get updated balance and leaderboard
    app.route("/buy-milk")
      .post((req, res)=>{
        const {qty, units, date} = req.body;
        const moonits = converter.convertToMoonits(qty, units)
        return res.json({result: `You gained ${moonits} moonits on ${date}`})
      });

    app.route("/drink-milk")
      .post((req, res)=>{
        const {qty, date} = req.body;
        return res.send({result: `You drank ${qty} moonits on ${date}`})
      });

    app.route("/leaderboard")
      .get((req, res) => {
        return res.json({leaderboard: [
          {name: "Doug", balance: 33},
          {name: "Mimi", balance: 20},
          {name: "Alison", balance: 3},
          {name: "Reuben", balance: 0},
          {name: "Alex", balance: -10}
         ]})
      })
}