const express = require("express");
const helloController = require("./controllers/helloController");
const userRoute = require("./routes/userRoute");
const app = express();

app.use("/api/hello", helloController.helloWorld);
app.use("/api/user", userRoute);

module.exports = app;