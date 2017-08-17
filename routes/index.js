const express = require("express");
const router = express.Router();

let user = { username: "kittyKat22", password: "littabox"};

function authenticate(req, res, next) {
  if (req.session.token) {
    res.redirect("/results");
  } else {
    console.log("No token");
    next();
  }
}

router.get("/", authenticate, function(req, res) {
  res.render("login");
});

router.get("/results", function(req, res, next) {
  if (req.session.token) {
    next();
  } else {
    res.redirect("/")
  }
}, function(req, res) {
  res.render("results", req.session.user);
});

router.post("/results", function(req, res) {
  let obj = {
    username: req.body.username,
    password: req.body.password
  };

  if (obj.username == user.username && obj.password == user.password) {
    req.session.user = obj;
    req.session.token = "abcd";
    res.redirect("/results");
  } else {
    res.redirect("/");
  }
});

router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
