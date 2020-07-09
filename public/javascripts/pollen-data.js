
const apiUrl = `https://cors-anywhere.herokuapp.com/https://opendata.dwd.de/climate_environment/health/alerts/s31fg.json`;



axios
  .get(apiUrl)
  .then((response) => {
    // console.log(response.data);
    const location = parseFloat(document.querySelector("#location").value);
    const rawData = response.data;
    const pollenDataAmbrosia = response.data.content[location];
    console.log("is this an object?", pollenDataAmbrosia);
    const propertyNames = Object.keys(pollenDataAmbrosia);
    console.log(response.data.content);

       
    })
    .catch(err => {
        console.log('Error while getting the data', err);
    });
