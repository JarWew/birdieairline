const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const logger = require('morgan');
const passport = require("passport");
const config = require('../config')
// const port = process.env.PORT || 8000;
const port = 8000;
const bodyParser = require('body-parser')
const fs = require("fs");
const cookieParser = require('cookie-parser')


mongoose.connect(config.db, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//passport config:
require("./config/passport")(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser())
app.use(bodyParser.json())
app.set("views", path.join(__dirname, "./../frontend/views"));
app.set("view engine", "ejs");

app.use("/js", express.static(path.join(__dirname, "./../frontend/js")));
app.use( "/assets", express.static(path.join(__dirname, "./../frontend/assets"))
);


//express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    // cookie: {maxAge: 180}
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/", require("./routes/routes"));
app.use("/users", require("./routes/users"));
app.use('/dashboard/reservation', require('./routes/reservation'));




app.listen(port, (err) => {
  if (err) {
    return console.log(`Wystąpił błąd ${err}`);
  }
  return console.log(`Apka działa na porcie ${port}`);
});


module.exports = app
