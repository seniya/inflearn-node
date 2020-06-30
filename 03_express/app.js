
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('Secret code'));

const sessions = {

}

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'Secret code',
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));
app.use(flash());

app.use((req, res, next) => {
  console.log('첫번째 미들웨어');
  next();
});

app.use((req, res, next) => {
  console.log('두번째 미들웨어');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 NOT FOUND
app.use((req, res, next) => {
  res.status(404).send('NOT FOUND');
})

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send('SERVER ERROR');
});

module.exports = app;
