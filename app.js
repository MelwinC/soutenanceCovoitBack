const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const initializeData = require('./database/initializeData');
const models = require('./models');

const app = express();
const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions)).use(logger('dev')).use(express.json()).use(express.urlencoded({ extended: false })).use(cookieParser()).use(express.static(path.join(__dirname, 'public')));

//! sync the database (force : true) to drop the table & re-create it
// models.sequelize.sync({force:true}).then(() => {
//   initializeData().then(() => {
//     console.log("data has been initialized")
//   });
// });

require('./routes/compte')(app);
require('./routes/testRoles')(app);
require('./routes/ville')(app);
require('./routes/marque')(app);
require('./routes/personne')(app);
require('./routes/voiture')(app);
require('./routes/trajet')(app);

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
  res.status(err.status || 500).send({ message: "Server error" });
});

module.exports = app;
