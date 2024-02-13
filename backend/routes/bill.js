const express = require('express');
const router = express.Router();
const validateToken = require("../middleware/auth");

const { billAddController, billGetAllController, billGetAllInvoiceNumbersController, billGetAllMobileNumbersController, billGetAllByInvoiceAndMobileController, billGetMainDetailsByIdController, billGetOrderItemDetailsByIdController, billSettleByIdController, billDeleteController } = require("../controllers/billController");

router.post("/add", billAddController);
router.get("/getOrderItemDetails/:id", [validateToken], billGetOrderItemDetailsByIdController);
router.get("/getOrderMainDetails/:id", [validateToken], billGetMainDetailsByIdController);
router.get("/getAllBills", [validateToken], billGetAllController);
// router.get("/getAllInvoiceNumbers", [validateToken], billGetAllInvoiceNumbersController); 
router.get("/getAllInvoiceNumbers",billGetAllInvoiceNumbersController); 
// router.get("/getAllMobileNumbers", [validateToken], billGetAllMobileNumbersController); 
router.get("/getAllMobileNumbers", billGetAllMobileNumbersController);
router.post("/getAllByInvoiceAndMobile", [validateToken], billGetAllByInvoiceAndMobileController);
router.put("/billSettle/:id", [validateToken], billSettleByIdController);
router.post("/delete", [validateToken], billDeleteController);

module.exports = router;