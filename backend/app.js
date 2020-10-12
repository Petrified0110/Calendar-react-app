const express = require("express");
const cors = require('cors');
const userRoute = require("./routes/userRoute");

const app = express();

const corsOptions = {
    origin: "*"
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/user", userRoute);

module.exports = app;