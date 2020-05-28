const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const sessionConfig = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  maxAge: 60 * 60,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
});

module.exports = sessionConfig;
