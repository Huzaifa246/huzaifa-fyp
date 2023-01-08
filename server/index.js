require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const celebRoute = require("./routes/celebs");
const fanRoute = require("./routes/fans");

const userRoutes = require("./routes/users");
const cuserRoutes = require("./routes/cusers");
const authRoutes = require("./routes/auth");
const celebAuthRoutes = require("./routes/celebAuth");
const passwordResetRoutes = require("./routes/passwordReset");
const cors = require("cors");
const path = require("path");
const { Timestamp } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");

// make data available in json
app.use(express.json());
app.use(cors());
// MAIN ROUTES
app.use("/api/celebs", celebRoute);
app.use("/api/fans", fanRoute);
// routes
app.use("/api/users", userRoutes);
app.use("/api/cusers", cuserRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/celeb-auth", celebAuthRoutes);
app.use("/api/password-reset", passwordResetRoutes);

// connection with mongoose
const port = process.env.PORT || 5000;
mongoose.connect(
  // "mongodb+srv://safi:safi@cluster0.ixljyir.mongodb.net/?retryWrites=true&w=majority",
  "mongodb+srv://huzaifa:mongodb2022@cluster0.3knlswf.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Cannot connect to the database!", err);
    } else {
      app.listen(5000, () => {
        port,
          console.log("connected to Database");
        console.log(`Server is running at ${port}...`);
      });

      // static used to access static files
      // __dirname => current directory
      app.use("/public", express.static(path.join(__dirname, "public")));

      // stripe integration------------------------------------
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())


      app.post("/payment", cors(), async (req, res) => {
        let { amount, id } = req.body
        try {
          const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Testing Company",
            payment_method: id,
            confirm: true
          })
          console.log("Payment", payment)
          res.json({
            message: "Payment successful",
            success: true
          })
        } catch (error) {
          console.log("Error", error)
          res.json({
            message: "Payment failed",
            success: false
          })
        }
      })
      //--------------------------------------------------------
    } // else bracket
  }
);

