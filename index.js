const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 4000;

app.listen(port, () => {
  console.log(`SERVER running on port ${port}`);
});
