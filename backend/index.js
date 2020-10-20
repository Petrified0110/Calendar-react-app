const app = require("./app");
const dotenv = require('dotenv').config('./config.env');

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
