const express = require("express");
const router = express.Router();
const Fan = require("../models/fans");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // password hash
const jwt = require("jsonwebtoken");

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dnpwjxrzf",
  api_key: "657142361551677",
  api_secret: "y93bziHtKoKDnZRerMg09BX3C74",
});

// FANS REGISTRATION
router.post("/fan-signup", async (req, res) => {
  const { slug, email, password, image } = req.body;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  try {
    if (!slug || !email || !password) return res.status(400).json({ success: false, message: "Please fill out the form" });
    if (!email.match(regexEmail)) return res.status(400).json({ success: false, message: "Invalid Email" });

    const fan = await Fan.findOne({ email });
    if (fan) return res.status(200).json({ success: false, message: "Fan already exists" });
    const hashPassword = await bcrypt.hash(password, 10);// 10 times shifting password
    const payload = await new Fan({
      slug,
      email,
      password: hashPassword,
      image
    }).save();

    res.status(200).json({ success: true, message: "Signup Successfully", data: { payload } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/fan-login", async (req, res) => {
  const { slug, email, password } = req.body;
  try {
    const user = await Fan.findOne({ slug, email });
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
// GET ALL FANS
router.get("/", (req, res) => {
  // Fan is the collection name of the mongoDB
  Fan.find()
    .then((result) => {
      res.status(200).json({
        fans: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// GET INDIVIDUAL FAN (by ID)
router.get("/:id", (req, res) => {
  Fan.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        fans: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// POST FANS
router.post("/", (req, res) => {
  // Fan is the collection name of the mongoDB
  const fan = new Fan({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    slug: req.body.slug,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image,

  });

  // saving the coming data in the database
  fan.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        fan: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// GET INDIVIDUAL FANS (by SLUG)
router.get("/indiFans/:slug", (req, res) => {
  Fan.findOne({ slug: req.params.slug }, (error, post) => {
    console.log(error, post);
    res.status(200).json({ fans: post });
  });
});

// UPDATE FAN IMAGE
router.put("/image/:id", upload.single("image"), async (req, res) => {
  console.log(req.file);
  const filePath = `${req.file.destination}/${req.file.filename}`;

  const upload = await cloudinary.uploader.upload(filePath);

  Fan.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        image: upload.url,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updatedFan: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
// UPDATE FANS INFO
router.put("/:id", (req, res) => {
  Fan.findOneAndUpdate(
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
        updatedFan: result,
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