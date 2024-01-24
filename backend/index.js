const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
const result = dotenv.config();

app.use(express.json());

const customerRouter = require("./routes/customer");
const categoryRouter = require("./routes/category");
const billRouter = require("./routes/bill");

app.use("/customer", customerRouter);
app.use("/category", categoryRouter);
app.use("/bill", billRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});