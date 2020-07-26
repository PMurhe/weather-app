const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const utils = require("./utils/weather-stack-api-calls");

const staticContentPath = path.join(__dirname, "../assets");

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticContentPath));
app.set("views", viewsPath);
app.set("view engine", "hbs");

hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Pratik Murhe",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Pratik Murhe",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Pratik Murhe",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.status(400).send({
      Error: "Please Provide a location!",
    });
  }

  utils
    .forecastApiCall(req.query.location)
    .then((response) => {
      res.status(200).send({
        searchCriteria: req.query.location,
        forecast: response.forecast,
        location: {
          name: response.location.name,
          region: response.location.region,
          country: response.location.country,
          localtime: response.location.localtime,
        },
      });
    })
    .catch((apiError) => {
      res.status(500).send(apiError);
    });
});

app.get("/help/*", (req, res) => {
  res.status(404).send("Help Article Not Found!");
});

app.get("*", (req, res) => {
  res.render("page-not-found");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
