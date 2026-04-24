const Task = require("../models/Task");

// ✅ CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating task" });
  }
};

// ✅ GET TASKS (WITH LEAD DETAILS)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("lead", "name email");
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};

// ✅ UPDATE TASK STATUS
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating task" });
  }
};

// 🔥 DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting task" });
  }
};