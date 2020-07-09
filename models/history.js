const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
 
const historySchema = new Schema({
  currentMood: Number, // 1=great ,2 ,3 ,4 ,5=really bad
  currectDate: Number,
  currentPollution: Number,
  
  // pollenAllergies: [String],
  // airPollution: Boolean
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
 
const History = mongoose.model("History", historySchema);
 
module.exports = History;