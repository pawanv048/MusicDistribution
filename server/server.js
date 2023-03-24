
const stripe = require('stripe')('sk_test_51Mix02SImlbs6lSYBt2B1OYwdWc9te2H0njDJ01ioVxbhdAWaIYumQLu4OUTWepHZLjT4vjU4pu3teJ8WixgfGmp00noEmPipq');
//sk_test_51Mix02SImlbs6lSYBt2B1OYwdWc9te2H0njDJ01ioVxbhdAWaIYumQLu4OUTWepHZLjT4vjU4pu3teJ8WixgfGmp00noEmPipq
const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello get data successfully')
})

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const {amount, currency} = req.body;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2022-11-15'}
  );

  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    //payment_method_types: ['card']
    automatic_payment_methods: {
      enabled: true,
    },
  });

    // Handle payment intent status
  if (paymentIntent.status === 'succeeded') {
    // Payment succeeded, handle success logic
  } else if (paymentIntent.status === 'requires_payment_method') {
    // Payment requires additional action from user, show error message to user
    console.log('Payment requires additional action');
  } else {
    // Payment failed, show error message to user
    console.log('Payment failed:', paymentIntent.last_payment_error.message);
  }

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    test:paymentIntent,
  });
});


app.listen(4002, () => console.log("Running on http://localhost:4002"))
