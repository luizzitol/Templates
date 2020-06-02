const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../../database/models/User");

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
  },
  function (accessToken, refreshToken, profile, cb) {
    User.findOne({ username: profile.emails[0].value }, (err, user) => {
      if (err) {
        return res.status(500).json({ errors: err });
      }

      if (!user) {
        console.log("no user found, creating new one");
        newUser = new User({
          name: profile.displayName,
          username: profile.emails[0].value,
          googleID: profile.id,
        });
        newUser.save(function (err) {
          if (err) console.log(err);
          return cb(err, newUser);
        });
      } else {
        //found user. Return
        return cb(err, user);
      }
    });
  }
);
