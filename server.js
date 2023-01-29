const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const corsOptions = require("./config/corsOption");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const cvRoute = require("./routes/cvRoute");
const coverLetterRoute = require("./routes/coverLetterRoute");
const resumeRoute = require("./routes/resumeRoute");
// middlewere

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// connect DB

mongoose.connect(
  process.env.DB_URL,
  {},
  () => {
    console.log("db connected");
  },
  (err) => {
    console.log(err);
  }
);

// routes
app.use("/api/", userRoute);
app.use("/api/", cvRoute);
app.use("/api/", coverLetterRoute);
app.use("/api/", resumeRoute);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
