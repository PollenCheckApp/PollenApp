const express = require('express');
const router  = express.Router();
const axios = require("axios");
const Pollens = require("../models/pollen");
const User = require("../models/user");


/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.user);
  res.render("index.hbs");
});

router.get("/about", (req, res, next) => {
  console.log(req.user);
  res.render("about.hbs");
});

router.get("/superfun", (req, res, next) => {
  const apiUrl = `https://opendata.dwd.de/climate_environment/health/alerts/s31fg.json`;
  axios
    .get(apiUrl)
    .then((response) => {
      console.log("how long is this?", response.data.content);
      response.data.content.forEach((el) => {
        const {
          partregion_name,
          Pollen,
          region_name,
          region_id,
          partregion_id,
        } = el;
        console.log(partregion_id);
        Pollens.create({
          part_region: partregion_name,
          region: region_name,
          region_id,
          pollen: Pollen,
          partregion_id,
        });
      });
    })
    .then(res.redirect("/fun"));
});
// used to be party route + party.hbs
router.get("/party", (req, res, next) => {
  console.log("does this work?", req.user.userRegion);
  let user = req.user;
  Pollens.find({ region_id: req.user.userRegion }).then((pollens) => {
    console.log(pollens);
    res.render("party.hbs", { user, pollens });
  });
});

router.get("/");

router.get("/fun", (req, res, next) => {
  console.log(req.user);
  res.render("fun.hbs", { user: req.user });
});


//const pollenEffect = ({pollen.Graeser.today}> 1 ) return "none";

module.exports = router;
