const request = require("request");
const config = require('../../config/config.json');

module.exports.weatherApiCall = function (location) {
  return new Promise((resolve, reject) => {
    let apiURL = `http://api.weatherstack.com/current?access_key=${config.WEATHER_STACK_ACCESS_KEY}&query=${location}`;

    request(
      {
        url: apiURL,
        json: true,
      },
      (error, response) => {
        if (error) {
          return reject(error);
        } else {
          const weatherData = response.body;
          return resolve(weatherData);
        }
      }
    );
  });
};

module.exports.forecastApiCall = function (location) {
  return new Promise((resolve, reject) => {
    let apiURL = `http://api.weatherstack.com/forecast?access_key=${config.WEATHER_STACK_ACCESS_KEY}&query=${location}`;
    request(
      {
        url: apiURL,
        json: true,
      },
      (e, response) => {
        if (e) {
          return reject(e.error);
        } else {
          if (!response.body.error) {
            const body = response.body;
            const forecastResponse = {
              summary : `${body.current.weather_descriptions[0]}.`,
              actualTemperature : `It is currently ${body.current.temperature} degress out.`,
              feelsLike : `It feels ${body.current.feelslike} degrees.`,
              precip : `There is a ${body.current.precip}% chance of rain.`
            };
            return resolve({forecast: forecastResponse, location : body.location});
          } else {
            return reject(response.body.error);
          }
        }
      }
    );
  });
};
