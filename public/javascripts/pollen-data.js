
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