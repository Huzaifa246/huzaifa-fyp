const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const { cloudinary } = require('../utils/cloudinary');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ slug: req.body.slug, email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email or username already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "Email sent to your account please verify(message from users file)" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id }, { verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
// GET INDIVIDUAL (by ID)
router.get("/:id", (req, res) => {
	User.findById(req.params.id)
		.then((result) => {
			res.status(200).json({
				users: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});
// GET ALL API route
router.get("/", (req, res) => {
	// Celebrity is the collection name of the mongoDB
	User.find()
		.then((result) => {
			res.status(200).json({
				users: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});
router.get("/indi/:slug", (req, res) => {
	User.findOne({ slug: req.params.slug }, (error, post) => {
		console.log(error, post);
		res.status(200).json({ users: post });
	});
});

router.put("/image/:id", upload.single("image"), async (req, res) => {
	console.log("id", req.params.id)
	const filePath = `${req.file.destination}${req.file.filename}`;
	console.log("filepath", filePath)
	const upload = await cloudinary.uploader.upload(filePath);
	console.log("Profiles", upload);

	User.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				image: upload.url,
			},
		}
	)
		.then((result) => {
			res.status(200).json({
				updatedFans: result,
				success: true,
				message: "Profile updated"
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

// UPDATE Fan INFO
router.put("/:id", (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				name: req.body.name,
				slug: req.body.slug,
				email: req.body.email,
				password: req.body.password,
				bio: req.body.bio,
			}
		}
	)
		.then((result) => {
			res.status(200).json({
				updatedFans: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});


module.exports = router;
