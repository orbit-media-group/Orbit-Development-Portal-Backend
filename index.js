const express = require("express");
let cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: `Endpoint Is Working!!` });
});

const invoiceRouter = require("./api/invoice/invoice.router");
app.use("/api/invoice", invoiceRouter);

app.listen(4000, () => {
  console.log("SERVER IS UP & RUNNING");
});
