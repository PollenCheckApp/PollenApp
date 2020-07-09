// const axios = require('axios');
const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");

//========================
// SIGNUP ROUTE 
//========================
// SIGNUP ROUTE - GET
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

 // SIGNUP ROUTE - POST
router.post("/signup", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const userRegion = req.body.userRegion;
  const zipcode = req.body.zipcode;
  // const userPollens = req.body.userPollens;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }
  // if (firstName !== String && firstName < 2) {
  //   res.render("auth/signup", { message: "Your name cannot be a number or less then 2 characters" });
  //   return;
  // }
  // if (password < 8) {
  //   res.render("auth/signup", { message: "Password needs to be at least 8 characters" });
  //   return;
  // }
  // if (userRegion !== '') {
  //   res.render("auth/signup", { message: "Please choose your region" });
  //   return;
  // }
  // if (zipcode !== '') {
  //   res.render("auth/signup", { message: "For more accurate results, please add a zipcode" });
  //   return;
  // }
  // if (userPollens !== '') {
  //   res.render("auth/signup", { message: "Please choose at least 1 allergen" });
  //   return;
  // }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
    // if (email !== null) {
    //   res.render("auth/signup", { message: "This email is already exists" });
    //   return;
    // }
    
 
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      firstName,
      lastName,
      email,
      userRegion,
      zipcode,
      // userPollens,
    });
 
    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        req.login(newUser, function(err) {
          if (err) { 
            return next(err);
          }
          return res.redirect("/private-page");

        });
      }
    });
  })
  .catch(error => {
    next(error);
  });
});

//========================
// SIGNIN ROUTE 
//========================
// SIGNIN ROUTE - GET
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

// SIGNIN ROUTE - POST
router.post("/login", passport.authenticate("local", {
  successRedirect: "/fun",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

//Authentication page
router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private.hbs", { user: req.user });
});

//LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
}); 

// HISTORY PAGE - WORKS!
router.get("/history", (req, res) => {
  res.render("history.hbs");
}); 

module.exports = router;