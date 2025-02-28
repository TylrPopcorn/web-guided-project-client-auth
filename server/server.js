const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 5001;
const app = express();
const data = require("./data");
const token = "ahuBHejkJJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA07i73Gebhu98";

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "bloom" && password === "tech") {
    req.loggedIn = true;
    res.status(200).json({
      username: "BloomTech",
      role: "editor",
      token: token
    });
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

app.post("/api/logout", (req, res) => {
  //remove token from database
  res.status(200).json({
    payload: token
  });
});

app.get("/api/data", authenticator, (req, res) => {
  setTimeout(() => {
    res.send(data);
  }, 1000);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

//Autthenticatioon workflow in frontend:
/*
  1. Start with login
  2. Handle the authentication request.
  3. Handle the logout

*/