const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { specs, swaggerUi } = require("./swagger");
const routes = require("./routes");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app
  .use(cors(corsOptions))
  .use(logger("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")));
app.use("/", routes).use("/doc", swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  res.status(404).send({ message: "Route not found" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Server error" });
});

module.exports = app;
