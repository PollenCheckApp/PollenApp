const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
 
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  userRegion: [Number],
  zipcode: Number,
  //userRegions: [Number],
  userPollens: [Number],
  // pollenAllergies: [String],
  // airPollution: Boolean
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
 
const User = mongoose.model("User", userSchema);
 
module.exports = User;