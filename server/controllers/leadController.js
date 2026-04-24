const Lead = require("../models/Lead");

// ✅ CREATE LEAD
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      isDeleted: false // 🔥 ensure always false
    });

    res.status(201).json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating lead" });
  }
};

// ✅ GET LEADS (with search + filter + pagination)
exports.getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;

    const query = { isDeleted: false };

    // 🔍 search by name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // 🎯 filter by status
    if (status) {
      query.status = status;
    }

    const leads = await Lead.find(query)
      .populate("assignedTo company")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching leads" });
  }
};

// ✅ UPDATE LEAD
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating lead" });
  }
};

// ✅ SOFT DELETE
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    lead.isDeleted = true;
    await lead.save();

    res.json({ msg: "Lead soft deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting lead" });
  }
};