const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
 
const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  zipcode: Number,
  userRegions: [Number],
  userPollens: [Number]
  // pollenAllergies: [String],
  // airPollution: Boolean
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
 
const User = mongoose.model("User", userSchema);
 
module.exports = User;