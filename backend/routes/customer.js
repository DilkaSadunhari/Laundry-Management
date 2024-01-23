const express = require('express');
const router = express.Router();

const { customerAddController,customerUpdateController,customerGetController,customerMobileNumberGetController } = require("../controllers/customerController");

router.post("/add", customerAddController);
router.put("/update/:id", customerUpdateController);
router.get("/get/:id", customerGetController);
router.get("/getAllMobileNumbers", customerMobileNumberGetController);



module.exports = router;