const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ctokenSchema = new Schema({
    celebId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Celebrity",
        unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("ctoken", ctokenSchema);
