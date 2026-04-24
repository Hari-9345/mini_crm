const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/leadController");

router.post("/", auth, ctrl.createLead);
router.get("/", auth, ctrl.getLeads);
router.put("/:id", auth, ctrl.updateLead);
router.delete("/:id", auth, ctrl.deleteLead);

module.exports = router;