const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Passport local mongoose will add username, password and salt to the Schema, so no need to define it here
const UserSchema = new Schema({
  date: { type: Date, default: Date.now },
  name: { type: String, required: true },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
