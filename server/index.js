require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const celebRoute = require("./routes/celebs");
const fanRoute = require("./routes/fans");
const bcrypt = require("bcrypt");
// const Fan = require("./models/fans");
// const Celebrity = require("./models/celebs");

const userRoutes = require("./routes/users");
const cuserRoutes = require("./routes/cusers");
const authRoutes = require("./routes/auth");
const celebAuthRoutes = require("./routes/celebAuth");
const passwordResetRoutes = require("./routes/passwordReset");

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser");
// make data available in json
app.use(express.json());
app.use(cors());


// connection with mongoose
mongoose.connect(
  // "mongodb://localhost:27017/FanClub",
  "mongodb+srv://huzaifa:mongodb2022@cluster0.3knlswf.mongodb.net/?retryWrites=true&w=majority",
  // "mongodb+srv://safi:safi@cluster0.ixljyir.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (err) {
      console.log("Cannot connect to the database!", err);
    } else {
      app.listen(5000, () => {
        console.log("connected to Database");
        console.log("Server is running at http://localhost:5000");
      });

      // MAIN ROUTES
      app.use("/api/celebs", celebRoute);
      app.use("/api/fans", fanRoute);
      // routes
      app.use("/api/users", userRoutes);
      app.use("/api/cusers", cuserRoutes);
      app.use("/api/auth", authRoutes);
      app.use("/api/celeb-auth", celebAuthRoutes);
      app.use("/api/password-reset", passwordResetRoutes);


      // error handling
      app.use((req, res) => {
        res.status(404).json({
          error: "Invalid URL. Page not found.",
        });
      });

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
          // console.log("Message payment wala", res.json.message)
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