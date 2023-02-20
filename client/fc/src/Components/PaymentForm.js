import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const meeting = useSelector((state) => state.meeting);
  const date = useSelector((state) => state.meeting.date);
  const time = useSelector((state) => state.meeting.time);
  const slug = useSelector((state) => state.slug);
  const object = useSelector((state) => state);
  const [fanID, setFanID] = useState("");

  axios.get(`http://localhost:5000/api/users/indi/${object.slug}`).then((resp) => {
    // console.log(resp.data.users);
    setFanID(resp.data.users._id)
  });
  console.log(fanID)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const billingDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: {
        city: e.target.city.value,
        line1: e.target.address.value,
        state: e.target.state.value,
      },
    };
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5000/payment", {
          amount: meeting.total_cost * 100,
          id,
        });

        const responseFSlug = await axios.put(`http://localhost:5000/api/celebs/${meeting.slug}/meet/${meeting._id}/${slug}`)
        if (response.data.success && responseFSlug.data.success) {
          console.log("Successful payment and updated booked");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  function book_session() {
    alert("Book session")
    axios.put(`http://localhost:5000/api/users/${fanID}`, {
      date: date,
      time: time,
      name: meeting.name
    })
  }
  return (
    <>
      <br />
      <br />
      <div className="Auth-form-container">
        {!success ? (
          <form onSubmit={handleSubmit}>
            <h3 className="Auth-form-title">Payment Details </h3>
            <div>
              <p><strong>Full Name: {meeting.name}</strong></p>
              <p><strong>Time: {meeting.time}</strong></p>
              <p><strong>Date: {meeting.date}</strong> </p>
              <p><strong>Meet Cost: {meeting.total_cost}</strong ></p>
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "black" }}>Full Name</label>
              <input
                name="name"
                label="Name"
                type="text"
                placeholder="Jane Doe"
                className="form-control mt-1"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "black" }}>Email</label>
              <input
                name="email"
                label="Email"
                type="email"
                placeholder="jane.doe@example.com"
                className="form-control mt-1"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "black" }}>Address</label>
              <input
                name="address"
                label="Address"
                type="text"
                placeholder="185 Berry St. Suite 550"
                className="form-control mt-1"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "black" }}>City</label>
              <input
                name="city"
                label="City"
                type="text"
                placeholder="San Francisco"
                className="form-control mt-1"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "black" }}>State</label>
              <input
                name="state"
                label="State"
                type="text"
                placeholder="California"
                className="form-control mt-1"
                required
              />
            </div>
            <div
              className="Auth-form"
              style={{ width: "600px", marginTop: "20px", padding: "10px" }}
            >
              <CardElement options={CARD_OPTIONS} />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary" style={{ width: "300px" }}>
                Pay
              </button>
            </div>
          </form>
        ) : (
          <div> <h3 className="Auth-form-title">Your payment was successful. Check your email</h3>

            <Link to="/fan-schedule">
              <Button color="secondary" onClick={book_session}> Go to Schedule </Button>
            </Link>
          </div>
        )
        }
      </div >
    </>
  );
}
