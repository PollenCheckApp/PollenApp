const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollenSchema = new Schema(
  {
    part_region: String,
    region: String,
    region_id: Number,
    partregion_id: Number,
    pollen: {},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Pollens = mongoose.model("Pollens", pollenSchema);

module.exports = Pollens;