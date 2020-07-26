console.log("Client Side JS");

const weatherForm = document.querySelector("form");
const searchCriteria = document.querySelector("input");
const errorMessage = document.querySelector("#errorMessage");
const searchText = document.querySelector("#searchText");

const forecastSummary = document.querySelector("#summary");
const forecastTemperature = document.querySelector("#actualTemperature");
const forecastPrecip = document.querySelector("#precip");

forecastSummary.textContent = "";
forecastTemperature.textContent = "";
forecastPrecip.textContent = "";

errorMessage.textContent = "";
searchText.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  searchText.textContent = "";
  errorMessage.textContent = "";

  forecastSummary.textContent = "";
  forecastTemperature.textContent = "";
  forecastPrecip.textContent = "";

  e.preventDefault();

  if (!searchCriteria.value) {
    return (errorMessage.textContent = "You Must enter a location to search!");
  }

  searchText.textContent = "Loading...";

  fetch(`/weather?location=${searchCriteria.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.log(data.error);
        errorMessage.textContent = "";
        errorMessage.textContent = JSON.stringify(data.error, null, 4);
        return;
      } else {
        if (data.info) {
          errorMessage.textContent = "";
          searchText.textContent = "";

          errorMessage.textContent = data.info;
        } else {
          errorMessage.textContent = "";
          searchText.textContent =
            data.location.name +
            ", " +
            data.location.region +
            ", " +
            data.location.country;

          forecastSummary.textContent = data.forecast.summary;
          forecastTemperature.textContent = data.forecast.actualTemperature + ' ' + data.forecast.feelsLike;
          forecastPrecip.textContent = data.forecast.precip;

          return;
        }
      }
    });
});
