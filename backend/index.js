const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
const result = dotenv.config();

app.use(express.json());

const customerRouter = require("./routes/customer");

app.use("/customer", customerRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});