const Lead = require("../models/Lead");

exports.getStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments({ isDeleted: false });

    const qualifiedLeads = await Lead.countDocuments({
      status: "Contacted",
      isDeleted: false
    });

    res.json({
      totalLeads,
      qualifiedLeads,
      tasksDueToday: 0,
      completedTasks: 0
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching stats" });
  }
};