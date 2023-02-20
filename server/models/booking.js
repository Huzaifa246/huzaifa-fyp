const mongoose = require("mongoose");
// const validator = require("validator");

const bookingSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    meeting: [{
        total_cost: String,
        total_members: Number,
        message: String,
        date: String,
        time: String,
        booked_slots: Number,
    }],
    payment: [{
        amount: String,
    }],

});


module.exports = mongoose.model('Celebrity', bookingSchema)