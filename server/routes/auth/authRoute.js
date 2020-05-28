const express = require("express");
const router = express.Router();

// @route     POST auth/user
// @desc      Return user
// @access    Private

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    return res.status(401).json({ errors: ["not auth"] });
  }
});

// @route     POST auth/logout
// @desc      Logout user
// @access    Private

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/user");
});

/// Routes

router.use("/local", require("./local/localRoute"));

module.exports = router;
