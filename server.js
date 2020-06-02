const express = require("express");
const passport = require("passport");

// Connecting to Database
require("./server/database/database")();

//Server config
const app = express();
app.use(express.json());
app.use(require("./server/middleware/session"));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", require("./server/routes/auth/authRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));
