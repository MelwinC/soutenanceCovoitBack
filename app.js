const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const sequelize = require("./database/connexion");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//! sync the database (force : true) to drop the table & re-create it
// sequelize.sync({force:true}).then(() => {
// sequelize.sync().then(() => {
//   initial();
// });

//! simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue à l'application JWT AUTH EXPRESS MYSQL." });
});

//! création des roles dans la BDD
// const models = require('./models');
// const Role = models.role;
// function initial() {
//   Role.create({
//     id: 1,
//     nom: "utilisateur"
//   });
//   Role.create({
//     id: 2,
//     nom: "personne"
//   });
//   Role.create({
//     id: 3,
//     nom: "admin"
//   });
// }

require('./routes/auth')(app);
require('./routes/testRoles')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
