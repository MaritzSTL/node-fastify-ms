const mongoose = require("mongoose");

const crewSchema = new mongoose.Schema({
  name: String,
  members: [{ name: String, alias: String }]
});

module.exports = mongoose.model("Crew", crewSchema);
