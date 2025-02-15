const express = require('express');
const app = express();
require("dotenv").config();
//const bcrypt = require('bcrypt'); 
const mongoURI = process.env.DB_URI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/api.js');
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

userRoutes(app);

// create html page for this
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// connect to database here
mongoose.connect(mongoURI)
.then(()=>{
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  });
})
.catch((error)=>{
  console.log(error);
});