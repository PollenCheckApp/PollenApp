const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

 
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
 
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
 
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }
 
  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
 
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
 
    const newUser = new User({
      username,
      password: hashPass
    });
 
    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        req.login(newUser, function(err) {
          if (err) { return next(err); }
          return res.redirect("/profile-setup");

        });
      }
    });
  })
  .catch(error => {
    next(error)
  })
});


router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
 
router.post("/login", passport.authenticate("local", {
  successRedirect: "/private-page",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

//Authentication page
router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

//LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
}); 


// PROFILE SETUP PAGE

router.get("/profile-setup", (req, res) => {
  res.render("profile-setup");
}); 

router.post("/profile-setup", (req, res, next) => {
  console.log(req.user)
  const {name, zipcode, userRegions, userPollens} = req.body;
  // const name = req.body.name;
  // const zipcode = req.body.zipcode;
  // console.log('the name is :', name);
  // console.log('the zipcode is :', zipcode);
  User.findByIdAndUpdate(req.user._id, { name, userRegions, userPollens} , { new: true }).then(responseDB => {
    console.log("this is the response", responseDB)
    res.redirect("/private-page")
  })
});

// HISTORY PAGE

router.get("/history", (req, res) => {
  res.render("history.hbs");
}); 


module.exports = router;