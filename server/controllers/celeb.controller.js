const Celebrity = require("../models/celebs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


module.exports.celebSignUp = async (req, res) => {
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
}

//Showing login form------------------------
module.exports.celebLogin = async (req, res) => {
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
}