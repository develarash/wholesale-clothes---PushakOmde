const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const runDb = require("./DB/database");

// DB
runDb();
const app = express();
// app.use(morgan("tiny"));
morgan.token("splitter", (req) => {
  return "\x1b[36m--------------------------------------------\x1b[0m\n";
});
morgan.token("statusColor", (req, res, args) => {
  // get the status code if response written
  var status = (
    typeof res.headersSent !== "boolean" ? Boolean(res.header) : res.headersSent
  )
    ? res.statusCode
    : undefined;

  // get status color
  var color =
    status >= 500
      ? 31 // red
      : status >= 400
      ? 33 // yellow
      : status >= 300
      ? 36 // cyan
      : status >= 200
      ? 32 // green
      : 0; // no color

  return "\x1b[" + color + "m" + status + "\x1b[0m";
});
app.use(
  morgan(
    `:splitter\x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - length|:res[content-length]`
  )
);
// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// Routes Middlewares
// app.use("/api/users", userRoute);
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/lib", express.static(path.resolve(__dirname, "assets/lib")));

// Routes
app.get("/", (req, res) => {
  res.render("home");
});
const PORT = process.env.PORT || 5000;
// Error Middleware
// app.use(errorHandler);
// Connect to DB and start server
app.listen(PORT, () => {
  console.log(`server Running on port ${PORT}`);
});
