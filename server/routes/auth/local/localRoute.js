const express = require("express");
const router = express.Router();
const User = require("../../../database/models/User");
const passport = require("passport");
const validation = require("./validation");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// @route     POST auth/local/register
// @desc      Register a user
// @access    Public

router.post("/register", (req, res) => {
  const { username, name, password, password2 } = req.body;

  // Validation
  const errors = validation(username, name, password, password2);

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }

  // if validation passes register new user
  else {
    User.register({ username, name }, password, function (err, user) {
      if (err) {
        console.log(err.message);
        return res.status(400).json({ errors: [err.message] });
      } else {
        console.log("authenticating");
        passport.authenticate("local")(req, res, function () {
          res.redirect("/auth/user");
        });
      }
    });
  }
});

// @route     POST auth/local/login
// @desc      Log in a user
// @access    Public

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    const { username } = req.body;
    let errors = [];

    if (err) {
      return res.status(400).json({ errors: [err.message] });
    } else if (!user) {
      console.log(info);
      return res.status(400).json({ errors: [info.message] });
    } else {
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ errors: [err.message] });
        } else {
          res.redirect("/auth/user");
        }
      });
    }
  })(req, res, next);
});

module.exports = router;
