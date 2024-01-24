const express = require('express');
const router = express.Router();

const { userLoginController} = require("../controllers/loginController");


router.post("/login", userLoginController);

module.exports = router;