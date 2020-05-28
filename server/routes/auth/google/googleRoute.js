const express = require("express");
const router = express.Router();
const passport = require("passport");
const googleStrategy = require("./googleStrategy");

passport.use(googleStrategy);

// @route     POST auth/google
// @desc      Log in user with google
// @access    Public

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// @route     POST auth/google/callback
// @desc      Callback from google
// @access    Public

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
