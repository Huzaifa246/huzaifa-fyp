const router = require("express").Router();
const { Celeb } = require("../models/celebs");
const Token = require("../models/ctoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// router.post("/", async (req, res) => {
// 	try {
// 		const { error } = validate(req.body);
// 		if (error)
// 			return res.status(400).send({ message: error.details[0].message });

// 		const user = await User.findOne({ slug: req.body.slug, email: req.body.email });
// 		if (!user)
// 			return res.status(401).send({ message: "Invalid Username or Email or Password" });
// 		// password
// 		const validPassword = await bcrypt.compare(
// 			req.body.password,
// 			user.password
// 		);
// 		if (!validPassword)
// 			return res.status(401).send({ message: "Invalid Email or Password! Please try again" });
// 		// token verification
// 		if (!user.verified) {
// 			let token = await Token.findOne({ userId: user._id });
// 			if (!token) {
// 				token = await new Token({
// 					userId: user._id,
// 					token: crypto.randomBytes(32).toString("hex"),
// 				}).save();
// 				const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
// 				await sendEmail(user.email, "Verify Email", url);
// 			}
// 			return res
// 				.status(400)
// 				.send({ message: "Email sent to your account please verify(message from auth file)" });
// 		}

// 		const token = user.generateAuthToken();
// 		res.status(200).send({ data: token, message: "logged in successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

// const validate = (data) => {
// 	const schema = Joi.object({
// 		slug: Joi.string().slug().required().label("slug"),
// 		email: Joi.string().email().required().label("Email"),
// 		password: Joi.string().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const celeb = await Celeb.findOne({ slug: req.body.slug });
        if (!celeb)
            return res.status(401).send({ message: "Invalid Username or Password" });

        const validPassword = await bcrypt.compare(
            req.body.password,
            celeb.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        if (!celeb.verified) {
            let token = await Token.findOne({ celebId: celeb._id });
            if (!token) {
                token = await new Token({
                    celebId: celeb._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
                const url = `${process.env.BASE_URL}celebs/${celeb.id}/verify/${token.token}`;
                await sendEmail(celeb.email, "Verify Email", url);
            }

            return res
                .status(400)
                .send({ message: "An Email sent to your account please verify" });
        }

        const token = celeb.generateAuthToken();
        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        slug: Joi.string().required().label("Slug"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;

//zikkuzcgywufizpp
