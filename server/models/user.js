// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

// const userSchema = new mongoose.Schema({
// 	slug: {
// 		type: String,
// 		required: true
// 	},
// 	email: {
// 		type: String,
// 		required: true
// 	},
// 	password: {
// 		type: String,
// 		required: true
// 	},
// 	verified: {
// 		type: Boolean,
// 		default: false
// 	}

// });

// userSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };

// const User = mongoose.model("user", userSchema);

// const validate = (data) => {
// 	const schema = Joi.object({
// 		slug: Joi.string().required().label("Full Name"),
// 		email: Joi.string().email().required().label("Email"),
// 		password: passwordComplexity().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

// module.exports = { User, validate };
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	slug: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	bio: { type: String },
	image: { type: String },
	verified: { type: Boolean, default: false },
	booked_meetings: [{
		celeb_name: { type: String, required: true },
		date: String,
		time: String,
	}]

});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);
// validation
const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Full Name"),
		slug: Joi.string().required().label("slug"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	const schema2 = Joi.object({
		email: Joi.string().email().required().label("Email"),
	});
	return schema.validate(data), schema2.validate;
};

module.exports = { User, validate };
