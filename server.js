const express = require("express");
const app = express();

require("./server/database/database")();
app.get("/", (req, res) => {
  res.json("Hi from the server");
});

app.listen(5000, console.log("Server listening on port 5000"));
