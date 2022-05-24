// add npm  
var createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    fs = require('fs'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    sequelize = require('./sequelize/models').sequelize,
    session = require('express-session'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    https =require('https');

// add config  
var dotenv = require('dotenv'),
    passportConfig = require('./passport');


// serverStart  
dotenv.config();
sequelize.sync();
passportConfig();


// add router  
var indexRouter = require('./src/routes/index.js');
var usersRouter = require('./src/routes/users.js');


var app = express();
app.set('httpPort', process.env.HTTP_PORT || 3000);
app.set('httpsPort', process.env.HTTPS_PORT || 3001);
var https_options = { key: fs.readFileSync(path.join(__dirname+'/localhost-key.pem')), cert: fs.readFileSync(path.join(__dirname+'/localhost.pem')) };


// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : "sessionSecret",
  cookie : {
    httpOnly : true,
    secure : false,
  },
}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || app.get('httpPort') , () => {
  console.log(process.env.PORT || app.get('httpPort'), '번 포트에서 대기중');
});

// for local
// app.listen(app.get('httpPort'), () => {
//   console.log(app.get('httpPort'), '번 포트에서 대기중');
// });

// https.createServer(https_options, app).listen(app.get('httpsPort'), function() {
//   console.log(app.get('httpsPort'), '서버 가동');
// });

module.exports = app;