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

// delete this code
let docURL = "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub";

const getDocument = async (url) => {
  fetch(url)
  .then(response => {
    const reader = response.body.getReader();
    return new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            push();
          });
        }
        push();
      }
    });
  })
  .then(stream => new Response(stream))
  .then(response => response.text())
  .then(text => console.log(text));
  }
  
getDocument(docURL)

// delete this code