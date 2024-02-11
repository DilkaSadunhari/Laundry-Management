const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');


const app = express();
const result = dotenv.config();
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods:["POST", "GET", "DELETE","PUT"],
        credentials: true
    }
))
app.use(express.json());
app.use(cookieParser());

const customerRouter = require("./routes/customer");
const categoryRouter = require("./routes/category");
const billRouter = require("./routes/bill");
const loginRouter = require("./routes/login");

app.use("/customer", customerRouter);
app.use("/category", categoryRouter);
app.use("/bill", billRouter);
app.use("/login", loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});