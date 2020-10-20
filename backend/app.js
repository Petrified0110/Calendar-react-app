const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv').config({path: './config.env'});
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");
const authController = require('../backend/controllers/authController');

const app = express();

const corsOptions = {
    origin: "*"
};

app.use(express.json());
app.use(cors(corsOptions));

//Routes
app.use("/api/user", userRoute);
app.use("/api/login", authController.loginUser);
app.use("/api/event", eventRoute);

// 404 Error not found handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });


module.exports = app;