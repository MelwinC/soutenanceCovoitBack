const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const models = require('./models');

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
// models.sequelize.sync({force:true}).then(() => {
// models.sequelize.sync().then(() => {
//   initial();
// });

//! simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue à l'application JWT AUTH EXPRESS MYSQL." });
});

//! création des roles dans la BDD
// function initial() {
//   models.role.create({
//     id: 1,
//     nom: "utilisateur"
//   });
//   models.role.create({
//     id: 2,
//     nom: "personne"
//   });
//   models.role.create({
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
