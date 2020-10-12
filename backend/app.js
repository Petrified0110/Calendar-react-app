const express = require("express");
const cors = require('cors');
const helloController = require("./controllers/helloController");
const userRoute = require("./routes/userRoute");

const app = express();

const corsOptions = {
    origin: "*"
};

app.use(express.json);
app.use(cors(corsOptions));

app.use("/api/hello", helloController.helloWorld);
app.use("/api/user", userRoute);

module.exports = app;