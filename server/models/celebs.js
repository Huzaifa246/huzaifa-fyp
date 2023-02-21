const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
// const validator = require("validator");

const celebritySchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  slug: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  category: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String },
  bankDetails: { type: String },
  verified: { type: Boolean, default: false },
  meeting: [
    {
      name: String,
      slug: String,
      total_cost: String,
      total_members: Number,
      message: String,
      date: { type: String, required: true },
      time: { type: String, required: true },
      booked_slots: Number,
      fanSlug: { type: String, default: null },
    },
  ],
});

celebritySchema.methods.generateAuthToken = function () {
  const ctoken = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return ctoken;
};

const Celeb = mongoose.model("Celebrity", celebritySchema);
// validation
const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Full Name"),
    slug: Joi.string().required().label("slug"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    bio: Joi.string().required().label("Bio"),
    category: Joi.string().required().label("Category"),
    bankDetails: Joi.string().required().label("BankDetails"),
  });
  const schema2 = Joi.object({
    email: Joi.string().email().required().label("Email"),
  });
  return schema.validate(data), schema2.validate;
};

module.exports = { Celeb, validate };
