const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
 
const historySchema = new Schema({
  currentMood: String,
  currectDate: Number,
  currentPollution: Number,
  
  // pollenAllergies: [String],
  // airPollution: Boolean
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
 
const History = mongoose.model("History", historySchema);
 
module.exports = History;