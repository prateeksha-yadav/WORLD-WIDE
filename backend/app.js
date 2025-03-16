const express = require("express");
const cors = require("cors");

const userRoute = require("./routes/usersRoutes");
const citiesRoute = require("./routes/citiesRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/auth", userRoute);
app.use("/cities", citiesRoute);

app.get("/", (req, res) => {
  res.send("WORLDWISE✨");
});

module.exports = app;
