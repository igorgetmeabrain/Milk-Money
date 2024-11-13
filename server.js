const express = require('express');
const app = express();
require("dotenv").config();
const mongoURI = process.env.DB_URI;
const mongoose = require('mongoose');
// import database module

const bodyParser = require('body-parser');
const userRoutes = require('./routes/api.js');
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database here

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

userRoutes(app);

app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});