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
        
      // flesh this out... convert to moonits and get updated balance
    app.route("/buy-milk")
      .post((req, res)=>{
        const {qty, units} = req.body;
        const moonits = converter.convertToMoonits(qty, units)
        return res.json({result: `you gained ${moonits} moonits`})
      });
}