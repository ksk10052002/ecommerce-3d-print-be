require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/Routes");
const uploadRoutes = require("./routes/upload");
const quoteRoutes = require("./routes/quote");
console.log("Upload routes loaded");


const app = express();
// app.use(cors({ origin: process.env.ORIGINS.split(",") }));
// app.use(cors({
//   origin: process.env.ORIGINS
//     ? process.env.ORIGINS.split(",")
//     : "*"
// }));

const allowedOrigins = process.env.ORIGINS
  ? process.env.ORIGINS.split(",")
  : [];

app.use(cors({
  origin: function (origin, callback) {

    // Allow server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", origin);

    return callback(new Error("Not allowed by CORS"));
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS"
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],

  credentials: true
}));

app.use(express.json());

app.use("/", router);

app.use("/api/uploads", uploadRoutes)
app.use("/api", quoteRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


// hello i am sai