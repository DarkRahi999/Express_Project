const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Y -----{ Middlewares }----- Y //
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Backend Project");
});

// W -----{ Routes }-----------
const userRoute = require("./routers/user.route");
app.use("/api/v1/user", userRoute);

module.exports = app;
