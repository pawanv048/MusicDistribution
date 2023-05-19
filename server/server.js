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

    const { email, amount, sourceToken } = req.body;
    //if (!email || !amount) return res.status(400).json({ message: "Please provide email and amount" });

    const customerId = await stripe.customers.create({
      email: 'sumit@123gmail.com',
    });
    const customers = await stripe.customers.list();
    const customer = customers.data[0];

    if (!customer) {
      return res.send({
        error: 'you have no customer created'
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: "usd",
      payment_method_types: ["card"],
      customer: customerId.id,
      // payment_method: paymentMethod.id,
      //receipt_email: customer.email,
      //metadata: { name },
    });
    // console.log("Payment Object:", paymentIntent);

    // Retrieve payment method details
    // const retrievedPaymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);
    // const cardBrand = retrievedPaymentMethod.card.brand;
    // console.log('brand', cardBrand);

    const clientSecret = paymentIntent.client_secret;
    res.json({
      message: "Payment initiated",
      clientSecret,
      email,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      payment_method_type: paymentIntent.payment_method_types[0],
      customer_id: customer.id,
      // brand: card.brand,
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
    // console.log("Charge ID:", event.data.object.charges.data[0].id); // Print the charge ID
    // fulfilment
  }
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));