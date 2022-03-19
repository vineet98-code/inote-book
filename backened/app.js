var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');

var app = express();

mongoose.connect('mongodb://localhost/inotebook',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => console.log(err ? err : "Connected true")
);

// const password = process.env.AmRLc6Ftd99ihOm2
// const DB= 'mongodb+srv://vineet98:AmRLc6Ftd99ihOm2@cluster0.f2bw8.mongodb.net/inotebook?retryWrites=true&w=majority'
// mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => console.log(err ? err : "Connected true"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors())
// For dealing in json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static("frontend/build"));
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// crreating basic server
// var http = require('http');

// http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello World</h1>');
//   res.end();
// })
// .listen(3000, () => console.log('Server started at port 3000'));


