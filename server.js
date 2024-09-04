const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });










app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});