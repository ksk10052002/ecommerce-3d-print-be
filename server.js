const express = require("express");
const cors = require("cors");
const router = require("./routes/Routes");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", router);

app.listen(8000, () => {
  console.log("Server is running on 8000");
});
