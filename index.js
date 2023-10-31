const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Orbit server is working!!!");
});

const port = 4000;

app.listen(port, () => {
  console.log(`SERVER running on port ${port}`);
});
