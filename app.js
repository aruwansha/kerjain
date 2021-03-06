var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// method override
const methodOverride = require("method-override");
// express-session
const session = require("express-session");
// connect-flash
var flash = require("connect-flash");
// cors
var cors = require('cors')
// favicon
var favicon = require('serve-favicon')


// environment
const dotenv = require("dotenv");
dotenv.config();

// mongoose
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// router custom
const adminRouter = require("./routes/admin");
const freelancerRouter = require("./routes/freelancer");
const apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);
app.use(cors())
app.use(favicon(path.join(__dirname, 'assets/images', 'favicon.ico')))

app.use("/", indexRouter);
app.use("/users", usersRouter);

// use custom router
app.use("/admin", adminRouter);
app.use("/freelancer", freelancerRouter);
app.use("/api/v1/user", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
