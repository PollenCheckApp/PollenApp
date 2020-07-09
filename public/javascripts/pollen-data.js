const key = "demo";
const functionName = "TIME_SERIES_DAILY";
const symbolName = "MSFT";
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

    document.querySelectorAll("div").forEach((div) => {
      for (let property of propertyNames) {
        console.log(div.id, property);
        if (div.id === property) {
          div.innerHTML = `${property}: ${pollenDataAmbrosia[property]}`;
        }
      }
    });
  })
  .catch((err) => {
    console.log("Error while getting the data", err);
  });

//1. Add a location to the user model
//2. create a homepage route that calls the API
//3. call the API with the info from the user model (the location value(eg. 0))
//4. make a new history entry into the database
//5. render the view from the response from the API
//-----------------//
//6. there is no check if the API has been called today at point 4. Add a date check and stop multiple renders
