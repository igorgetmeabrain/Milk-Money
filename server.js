const express = require('express');
const app = express();
require("dotenv").config();
const cowQuotes = require("./components/cowquotes.json")

const port = process.env.PORT || 3000;

// ROUTES

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });

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







app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});