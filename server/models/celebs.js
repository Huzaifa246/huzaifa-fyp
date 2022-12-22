const mongoose = require("mongoose");
// const validator = require("validator");

const celebritySchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: String,
  slug: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  category: String,
  bio: String,
  image: String,
  reels: [{ type: String }],
  meeting: [{
    total_cost: String,
    total_members: Number,
    message: String,
    date: String,
    time: String,
    booked_slots: Number,
  }]
  // total_cost : String,
  //   total_members : Number,
  //   message: String,
  //   day: String,
  //   date: String,
});


module.exports = mongoose.model('Celebrity', celebritySchema)