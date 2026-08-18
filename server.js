require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/Routes");
const uploadRoutes = require("./routes/upload");
const quoteRoutes = require("./routes/quote");
console.log("Upload routes loaded");


const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", router);

app.use("/api/uploads", uploadRoutes)
app.use("/api", quoteRoutes);

app.use("/api/uploads", uploadRoutes)
app.use("/api", quoteRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


// hello i am sai