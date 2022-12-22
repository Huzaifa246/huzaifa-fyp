const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    videos: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = Mediia = mongoose.model('Media', MediaSchema)
