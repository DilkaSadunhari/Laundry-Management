const express = require('express');
const router = express.Router();

const {categoryAddController,categoryUpdateController,categoryGetController,categoryNamesGetController  } = require("../controllers/categoryController");

router.post("/add", categoryAddController);
router.put("/update/:id", categoryUpdateController);
router.get("/get/:id", categoryGetController);
router.get("/getAllNames", categoryNamesGetController);



module.exports = router;