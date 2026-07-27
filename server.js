require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/Routes");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


// hello i am sai