const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/companyController");

router.post("/", ctrl.createCompany);
router.get("/", ctrl.getCompanies);
router.get("/:id", ctrl.getCompanyDetail);

module.exports = router;