const mongoose = require("mongoose");

const fanSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  slug: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  bio: String,
  image: String,
});


module.exports = mongoose.model('Fan', fanSchema)