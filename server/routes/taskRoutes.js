const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/taskController");

// Create task
router.post("/", auth, ctrl.createTask);

// Get all tasks
router.get("/", auth, ctrl.getTasks);

// Update task status
router.put("/:id", auth, ctrl.updateTask);

// 🔥 DELETE task
router.delete("/:id", auth, ctrl.deleteTask);

module.exports = router;