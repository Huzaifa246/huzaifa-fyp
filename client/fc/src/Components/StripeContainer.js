import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51LkIqJA0STgghspEhqp72emtTOcDuai4KUfJg7vwJDdx6zmr50qL8FJ3fZU7NQIUs3vlIkJLJZKkLR8ZCJT3pFcN00OZoowabC"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
