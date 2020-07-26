console.log("Client Side JS");

const weatherForm = document.querySelector("form");
const searchCriteria = document.querySelector("input");
const forecastInformation = document.querySelector("#forecastInformation");
const errorMessage = document.querySelector("#errorMessage");
const searchText = document.querySelector("#searchText");

forecastInformation.textContent = "";
errorMessage.textContent = "";
searchText.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  searchText.textContent = "";
  errorMessage.textContent = "";
  forecastInformation.textContent = "";
  e.preventDefault();

  if (!searchCriteria.value) {
    return (errorMessage.textContent = "You Must enter a location to search!");
  }

  forecastInformation.textContent = "Loading...";

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
          forecastInformation.textContent = '';
          searchText.textContent = '';

          errorMessage.textContent = data.info;
        } else {
          errorMessage.textContent = "";
          searchText.textContent =
            data.location.name +
            ", " +
            data.location.region +
            ", " +
            data.location.country;
          forecastInformation.textContent = data.forecast;
          return;
        }
      }
    });
});
