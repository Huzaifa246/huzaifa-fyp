const router = require("express").Router();
const { Celeb } = require("../models/celebs");
const Token = require("../models/ctoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// send password link
router.post("/", async (req, res) => {
    try {
        const emailSchema = Joi.object({
            email: Joi.string().email().required().label("Email"),
        });
        const { error } = emailSchema.validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        let celeb = await Celeb.findOne({ email: req.body.email });
        if (!celeb)
            return res
                .status(409)
                .send({ message: "User with given email does not exist!" });

        let token = await Token.findOne({ celebId: celeb._id });
        if (!token) {
            token = await new Token({
                celebId: celeb._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const url = `${process.env.BASE_URL}celeb-password-reset/${celeb._id}/${token.token}/`;
        await sendEmail(celeb.email, "Password Reset", url);

        res
            .status(200)
            .send({ message: "Password reset link sent to your email account" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
    try {
        const celeb = await Celeb.findOne({ _id: req.params.id });
        if (!celeb) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            celebId: celeb._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        res.status(200).send("Valid Url");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//  set new password
router.post("/:id/:token", async (req, res) => {
    try {
        const passwordSchema = Joi.object({
            password: passwordComplexity().required().label("Password"),
        });
        const { error } = passwordSchema.validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const celeb = await Celeb.findOne({ _id: req.params.id });
        if (!celeb) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            celebId: celeb._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        if (!celeb.verified) celeb.verified = true;

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        celeb.password = hashPassword;
        await celeb.save();
        await token.remove();

        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
