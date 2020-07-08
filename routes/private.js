const express = require('express');
const router  = express.Router();
const axios = require('axios');

router.get('/private-page', (req, res, next) => {
      const apiUrl = `https://opendata.dwd.de/climate_environment/health/alerts/s31fg.json`;
      axios.get(apiUrl).then(response => {
        
        console.log("here's the dataresponse",response.data);
        const rawData = response.data;
        const pollenDataAmbrosia = response.data.content[0].Pollen.Ambrosia.today;
        console.log(pollenDataAmbrosia);
        res.render('private',{rawData});
         })
    .catch(err => {
        console.log('Error while getting the data', err);
    })
    });
    






//https://cors-anywhere.herokuapp.com/

module.exports = router;

