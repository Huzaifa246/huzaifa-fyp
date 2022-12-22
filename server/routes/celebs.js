const express = require("express");
const celebRouter = express.Router();
const Celebrity = require("../models/celebs");
const mongoose = require("mongoose");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const cloudinary = require('cloudinary').v2;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


cloudinary.config({
  cloud_name: 'dnpwjxrzf',
  api_key: '657142361551677',
  api_secret: 'y93bziHtKoKDnZRerMg09BX3C74'
})


// CREATE CELEBRITY
celebRouter.post("/ ", async (req, res) => {
  const { name, slug, email, password, image, bio } = req.body;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  try {
    if (!name || !slug || !email || !password) return res.status(400).json({ success: false, message: "Please fill out the form" });
    if (!email.match(regexEmail)) return res.status(400).json({ success: false, message: "Invalid Email" });

    const celeb = await Celebrity.findOne({ email });
    if (celeb) return res.status(200).json({ success: false, message: "Celebrity already exists" });
    const hashPassword = await bcrypt.hash(password, 10);
    const payload = await new Celebrity({
      name,
      slug,
      email,
      password: hashPassword,
      image,
      bio
    }).save();

    res.status(200).json({ success: true, message: "Signup Successfully", data: { payload } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// LOGIN CELEBRITY
celebRouter.post("/celeb-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Celebrity.findOne({ email });

    if (!user) return res.status(404).json({ status: false, message: "Give correct credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, "randomString", { expiresIn: "1y" });

      return res.status(200).json({ status: true, message: "login successful", data: { user, token } });
    } else {
      return res.status(401).json({ status: false, message: "could not login" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

// GET ALL CELEBRITIES
celebRouter.get("/", (req, res) => {
  // Celebrity is the collection name of the mongoDB
  Celebrity.find()
    .then((result) => {
      res.status(200).json({
        celebrities: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// GET INDIVIDUAL CELEBRITY (by ID)
celebRouter.get("/:id", (req, res) => {
  Celebrity.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        celebrities: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// celebRouter.post("/", (req, res) => {
//   // Celebrity is the collection name of the mongoDB
//   const celeb = new Celebrity({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     slug: req.body.slug,
//     email: req.body.email,
//     password: req.body.password,
//     category: req.body.category,
//     bio: req.body.bio,
//     image: req.body.image,
//     reels: req.body.reels,
//     // meeting: [{ 
//     //   total_cost : req.body.total_cost,
//     //   total_members : req.body.total_members,
//     //   message: req.body.message,
//     //   date: req.body.date,
//     //   time: req.body.time,
//     // }],
//   });

//   // saving the coming data in the database
//   celeb
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json({
//         celebrity: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });



// GET INDIVIDUAL CELEBRITY (by SLUG)
celebRouter.get("/indi/:slug", (req, res) => {
  Celebrity.findOne({ slug: req.params.slug }, (error, post) => {
    console.log(error, post);
    res.status(200).json({ celebrities: post });
  });
});

// UPDATE CELEBRITY IMAGE
celebRouter.put("/image/:id", upload.single('image'), async (req, res) => {

  console.log(req.file);
  const filePath = `${req.file.destination}/${req.file.filename}`;

  const upload = await cloudinary.uploader.upload(filePath);

  Celebrity.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        image: upload.url,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updatedCeleb: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});


// UPDATE CELEBRITY 
celebRouter.put("/:id", (req, res) => {
  Celebrity.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        slug: req.body.slug,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
        bio: req.body.bio,
      },

      $push: {
        meeting: [{
          total_cost: req.body.total_cost,
          total_members: req.body.total_members,
          message: req.body.message,
          date: req.body.date,
          time: req.body.time,
          booked_slots: req.body.booked_slots,
        }],
      }
    }
  )
    .then((result) => {
      res.status(200).json({
        updatedCeleb: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// DELETE CELEBRITY
celebRouter.delete("/:id", (req, res) => {
  Celebrity.findOneAndDelete(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        slug: req.body.slug,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
        bio: req.body.bio,
        image: req.body.image,
        meeting: [{
          total_cost: req.body.total_cost,
          total_members: req.body.total_members,
          message: req.body.message,
          date: req.body.date,
          time: req.body.time,
          booked_slots: req.body.booked_slots,
        }],
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Celebrity has been deleted",
        updatedCeleb: result
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// send password link  [locahost:3000/api/celebs/celeb/]
celebRouter.post('/celebpassword/', async (req, res) => {
  try {
    const emailValidator = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    const { error } = emailValidator.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let celebrity = await Celebrity.findOne({ email: req.body.email });
    if (!celebrity)
      return res
        .status(409)
        .send({ message: "Celebrity with given email does not exist!" });

    const url = `${process.env.BASE_URL}password-reset/${celebrity._id}/`;
    await sendEmail(celebrity.email, "Password Reset", url);

    res
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// verify password reset link
// celebRouter.get("/:id", async (req, res) => {
// 	try {
// 		const celebrity = await Celebrity.findOne({ _id: req.params.id });
// 		if (!celebrity) return res.status(400).send({ message: "Invalid link" });

// 		// const token = await Token.findOne({
// 		// 	userId: user._id,
// 		// 	token: req.params.token,
// 		// });
// 		// if (!token) return res.status(400).send({ message: "Invalid link" });

// 		res.status(200).send("Valid Url");
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

//  set new password
celebRouter.post("/:id", async (req, res) => {
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const celebrity = await Celebrity.findOne({ _id: req.params.id });
    if (!celebrity) return res.status(400).send({ message: "Invalid link" });

    // const token = await Token.findOne({
    // 	userId: user._id,
    // 	token: req.params.token,
    // });
    // if (!token) return res.status(400).send({ message: "Invalid link" });

    if (!user.verified) user.verified = true;

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();
    // await token.remove();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = celebRouter;