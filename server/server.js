const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51My6FhSEXddR3UfQYHtwfrefFmcM2mHU8ycOs8xg7yX8uyJPUL5ZlxT5F7eguOonisC2ZNVpFpFHRiqWSfOEqgfA00vZ223iYx");
const app = express();
const PORT = 4002;

app.use("/stripe", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cors());

app.post("/pay", async (req, res) => {
  try {

    const { email, amount } = req.body;
    //if (!email || !amount) return res.status(400).json({ message: "Please provide email and amount" });

    const customerId = await stripe.customers.create({
      email: 'sumit@gmail.com',
    });
    const customers = await stripe.customers.list();
    const customer = customers.data[0];

    if (!customer) {
      return res.send({
        error: 'you have no customer created'
      })
    }
    // console.log(customers); // log the customers array


    const paymentIntent = await stripe.paymentIntents.create({
      amount: 4000,
      currency: "INR",
      payment_method_types: ["card"],
      customer: customerId.id,
      //receipt_email: customer.email,
      //metadata: { name },
    });
    //console.log(paymentIntent); // log the paymentIntent object
    //console.log(customers);
    //console.log(receipt_email, "rahula@gmail.com")
    // Get the card brand
    // const cardBrand = paymentIntent.payment_method_details.card.brand;
    // console.log(cardBrand); // e.g. 'visa', 'mastercard', etc.
    
    const clientSecret = paymentIntent.client_secret;
    res.json({
      message: "Payment initiated",
      clientSecret,
      email,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      payment_method_type: paymentIntent.payment_method_types[0],
      customer_id: customer.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});




app.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));