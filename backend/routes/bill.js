const express = require('express');
const router = express.Router();

const { billAddController, billGetAllController, billGetAllInvoiceNumbersController, billGetAllMobileNumbersController, billGetAllByInvoiceAndMobileController, billGetMainDetailsByIdController, billGetOrderItemDetailsByIdController, billSettleByIdController, billDeleteController } = require("../controllers/billController");

router.post("/add", billAddController);
// router.put("/update/:id", categoryUpdateController);
router.get("/getOrderItemDetails/:id", billGetOrderItemDetailsByIdController);
router.get("/getOrderMainDetails/:id", billGetMainDetailsByIdController);
router.get("/getAllBills", billGetAllController);
router.get("/getAllInvoiceNumbers", billGetAllInvoiceNumbersController); 
router.get("/getAllMobileNumbers", billGetAllMobileNumbersController); 
router.post("/getAllByInvoiceAndMobile", billGetAllByInvoiceAndMobileController);
router.put("/billSettle/:id", billSettleByIdController);
router.post("/delete", billDeleteController);

module.exports = router;