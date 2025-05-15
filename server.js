const express = require('express');
const app = express();
require("dotenv").config();
const mongoURI = process.env.DB_URI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// is this needed?
const flash = require('express-flash');

const session = require('express-session');
const passport = require('passport');
const initialisePassport = require('./passport-config.js');
initialisePassport(passport);
const userRoutes = require('./routes/api.js');
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// is this needed?
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

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