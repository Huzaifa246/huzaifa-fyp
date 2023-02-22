const express = require("express");
const celebRouter = express.Router();
const { Celeb, validate } = require("../models/celebs");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");
const Token = require("../models/ctoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

celebRouter.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let celeb = await Celeb.findOne({
      slug: req.body.slug,
      email: req.body.email,
    });
    if (celeb)
      return res
        .status(409)
        .send({ message: "User with given email or username already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    celeb = await new Celeb({ ...req.body, password: hashPassword }).save();

    // const token = await new Token({
    //   celebId: celeb._id,
    //   token: crypto.randomBytes(32).toString("hex"),
    // }).save();
    const url = `${process.env.BASE_URL}celebs/${celeb.id}/verify/${token.token}`;
    await sendEmail("fanclub.co.pk@gmail.com", "Verify Email", "Celebrity request for registration verification:\n" + "Celebrity slug:" + celeb.slug + "\nCelebrity Email:" + celeb.email + "\nCelebrity Bio:" + celeb.bio + "\nCelebrity Category: " + celeb.category);
    await sendEmail(celeb.email, "Verify Email", "Dear Celebrity,\n We have received your request for registration. Our team will contact you in upcoming working days." + "\n Thanks\n Regards \n FANCLUB.co");

    res.status(201).send({
      message:
        "Email sent to your account please verify(message from users file)",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

celebRouter.get("/:id/verify/:token/", async (req, res) => {
  try {
    const celeb = await Celeb.findOne({ _id: req.params.id });
    if (!celeb) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      celebId: celeb._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await Celeb.updateOne({ _id: celeb._id }, { verified: true });
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// LOGIN CELEBRITY
celebRouter.post("/celeb-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Celeb.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "Give correct credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, "randomString", {
        expiresIn: "1y",
      });

      return res.status(200).json({
        status: true,
        message: "login successful",
        data: { user, token },
      });
    } else {
      return res
        .status(401)
        .json({ status: false, message: "could not login" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

// GET ALL CELEBRITIES
celebRouter.get("/", (req, res) => {
  // Celebrity is the collection name of the mongoDB
  Celeb.find()
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
//-----------------MEET --------------------------------
celebRouter.get("/:id/meet", async (req, res) => {
  const _id = req.params.id;
  try {
    const celeb = await Celeb.find({ _id });
    let meeting;
    celeb.meeting.forEach((meet) => {
      console.log("meet", meet);
      if (meet._id.toString() === _id) {
        console.log("true");
        meeting = meet;
      }
    });
    res.status(200).json({ success: true, message: "ok", data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// get meet id
celebRouter.get("/:id/meet/:meetId", async (req, res) => {
  const _id = req.params.id;
  const meetId = req.params.meetId;
  try {
    const celeb = await Celeb.findOne({ _id });
    let meeting;
    celeb.meeting.forEach((meet) => {
      console.log("meet", meet);
      if (meet._id.toString() === meetId) {
        console.log("true");
        meeting = meet;
      }
    });
    res.status(200).json({ success: true, message: "ok", data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// update meeting
celebRouter.put("/:id/meet/:meetId", async (req, res) => {
  const _id = req.params.id;
  const meetId = req.params.meetId;
  try {
    const celeb = await Celeb.findOne({ _id });
    let meeting;
    celeb.meeting.forEach((meet) => {
      console.log("meet", meet);
      if (meet._id.toString() === meetId) {
        console.log("meeting", meet);
      }
    });

    console.log("celeb", celeb);
    await celeb.save();
    res.status(200).json({ success: true, message: "ok", data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// delete meet id
celebRouter.delete("/:id/meet/:meetId", async (req, res) => {
  const _id = req.params.id;
  const meetId = req.params.meetId;
  try {
    const celeb = await Celeb.findOne({ _id });
    let meeting = celeb.meeting.filter((meet) => {
      return meet._id.toString() !== meetId;
    });
    celeb.meeting = meeting;
    await celeb.save();
    res.status(200).json({ success: true, message: "ok", data: celeb });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// --------------------------------Meet ENDS------------------------
// GET INDIVIDUAL CELEBRITY (by ID)
celebRouter.get("/:id", (req, res) => {
  Celeb.findById(req.params.id)
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

// GET INDIVIDUAL CELEBRITY (by SLUG)
celebRouter.get("/indi/:slug", (req, res) => {
  Celeb.findOne({ slug: req.params.slug }, (error, post) => {
    console.log(error, post);
    res.status(200).json({ celebrities: post });
  });
});

// UPDATE CELEBRITY IMAGE
// celebRouter.put("/image/:id", upload.single("image"), async (req, res) => {
//   console.log("id", req.params.id);
//   const filePath = `${req.file.destination}${req.file.filename}`;
//   console.log("filepath", filePath);
//   console.log(req.file);
//   const upload = await cloudinary.uploader.upload(filePath);
//   console.log("Profiles", upload);

//   Celeb.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       $set: {
//         image: upload.url,
//       },
//     }
//   )
//     .then((result) => {
//       res.status(200).json({
//         updatedCeleb: result,
//         success: true,
//         message: "Profile updated",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });
celebRouter.put("/image/:id", upload.single("image"), async (req, res) => {
  try {
    // Validate input
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path);

    // Update database
    const celeb = await Celeb.findByIdAndUpdate(id, {
      image: uploadResult.url,
    });
    if (!celeb) {
      return res.status(404).json({ error: "Celeb not found" });
    }
    // Send response
    res.status(200).json({
      updatedCeleb: celeb,
      success: true,
      message: "Profile updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// UPDATE CELEBRITY INFO
celebRouter.put("/:id", (req, res) => {
  Celeb.findOneAndUpdate(
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
        meeting: [
          {
            name: req.body.name,
            slug: req.body.slug,
            total_cost: req.body.total_cost,
            total_members: req.body.total_members,
            message: req.body.message,
            date: req.body.date,
            time: req.body.time,
            booked_slots: req.body.booked_slots,
          },
        ],
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
// update meeting fanslug
celebRouter.put("/:slug/meet/:meetId/:fslug", async (req, res) => {
  const slug = req.params.slug;
  const meetId = req.params.meetId;
  const fslug = req.params.fslug;
  try {
    const celeb = await Celeb.findOne({ slug });
    let meeting;
    celeb.meeting.forEach((meet) => {
      console.log("meet", meet);
      if (meet._id.toString() === meetId) {
        if (meet.fanSlug === null) return (meet.fanSlug = fslug);

        console.log("meeting", meet);
      }
    });

    console.log("celeb", celeb);
    await celeb.save();
    res.status(200).json({ success: true, message: "ok", data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// ---- getting all fan booked meeting from celeb array
celebRouter.get("/meeting/:fanSlug", async (req, res) => {
  const fanSlug = req.params.fanSlug;
  try {
    const celebrities = await Celeb.find({
      "meeting.fanSlug": fanSlug,
    });
    const meetings = celebrities.map((celebrity) =>
      celebrity.meeting.filter((meet) => meet.fanSlug === fanSlug)
    ).flat();
    res.status(200).json({ success: true, data: meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
//_____

celebRouter.put("/editProfile/:id", (req, res) => {
  Celeb.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        slug: req.body.slug,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
        bio: req.body.bio,
        bankDetails: req.body.bankDetails,
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
  Celeb.findOneAndDelete(
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
        meeting: [
          {
            total_cost: req.body.total_cost,
            total_members: req.body.total_members,
            message: req.body.message,
            date: req.body.date,
            time: req.body.time,
            booked_slots: req.body.booked_slots,
          },
        ],
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Celebrity has been deleted",
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

// send password link  [locahost:3000/api/celebs/celeb/]
celebRouter.post("/celebpassword/", async (req, res) => {
  try {
    const emailValidator = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    const { error } = emailValidator.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let celebrity = await Celeb.findOne({ email: req.body.email });
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

    const celebrity = await Celeb.findOne({ _id: req.params.id });
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
