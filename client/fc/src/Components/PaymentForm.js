import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


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
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm() {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const billingDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            address: {
                city: e.target.city.value,
                line1: e.target.address.value,
                state: e.target.state.value
            }
        };
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: billingDetails
        })


        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:5000/payment", {
                    amount: 1000,
                    id
                })

                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className="Auth-form-container">
                {!success ?
                    <form onSubmit={handleSubmit}>
                        <h3 className="Auth-form-title">Payment Details</h3>
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
                        <div className="Auth-form" style={{ width: "600px", marginTop: "20px", padding: "10px" }}>
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button
                                className="btn btn-primary"
                                style={{ width: "300px" }}
                            >
                                Pay
                            </button>
                        </div>
                    </form>
                    :
                    <div>
                        <h3 className="Auth-form-title">Your payment was successful. Check your email</h3>
                    </div>
                }
            </div>
        </>
    )
}
