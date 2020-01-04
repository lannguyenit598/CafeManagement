import createError from "http-errors"
import configViewEngine from "./config/viewEngine"

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config/db.config');
var mongoose = require('mongoose');
var flash    = require('connect-flash');
var session      = require('express-session');
var passport = require('passport');

require('./config/passport')(passport);

const expressLayouts = require("express-ejs-layouts");
const router = require("express").Router();
router.use(expressLayouts)

var indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
const adminRouter = require('./routes/admin');
const staffRouter = require('./routes/staff');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
configViewEngine(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
  secret: 'xxxxxxxxxxxxx',
  resave: true,
  saveUninitialized: true,})
); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

app.use(function(req, res, next){
// if there's a flash message in the session request, make it available 
  if(res.locals !== undefined) {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
  }
});

mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true, useFindAndModify: false}, (err, res) => {
  if (!err) {
    console.log('Connect to databse successfully!');
  }
});

app.use('/home-product',productRouter);
app.use('/home', indexRouter);
app.use('/home-staff', staffRouter);
app.use(expressLayouts);
app.set("layout", "admin/layout");
app.use('/', adminRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
