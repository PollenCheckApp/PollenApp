const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('index.hbs');
});

router.get('/about', (req, res, next) => {
  console.log(req.user);
  res.render('about.hbs');
});

module.exports = router;
