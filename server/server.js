const stripe = require('stripe')('sk_test_51Mix02SImlbs6lSYBt2B1OYwdWc9te2H0njDJ01ioVxbhdAWaIYumQLu4OUTWepHZLjT4vjU4pu3teJ8WixgfGmp00noEmPipq');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello get data successfully')
})

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const { amount, currency } = req.body;
  const customer = await stripe.customers.create();

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2022-11-15' }
    // { apiVersion: req.headers['2022-11-15'] }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });

});


app.listen(4002, () => console.log("Running on http://localhost:4002"))






















