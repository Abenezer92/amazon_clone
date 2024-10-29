const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripeSec = process.env.STRIPE_SECRET_KEY;
// console.log(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

if (!stripeSec) {
  console.error("Stripe key is missing");
  throw new Error("Stripe key is missing");
}

const stripe = require("stripe")(stripeSec);

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const app = express();
app.use(cors({ origion: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "USD",
    });

    res.status(200).json({
      // paymentIntent
      clientPaymentSecret: paymentIntent.client_secret,
    });

    // console.log(`total payment requested is: ${total}`)
    // res.send(`total payment requested is: ${total}`)
  } else {
    res.status(403).json({
      message: "Payment amount must be greater than zero (0).",
    });
  }
});

exports.api = onRequest(app);
