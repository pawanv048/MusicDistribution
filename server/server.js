const express = require('express');
const stripe = require('stripe')('sk_test_51Mix02SImlbs6lSYBt2B1OYwdWc9te2H0njDJ01ioVxbhdAWaIYumQLu4OUTWepHZLjT4vjU4pu3teJ8WixgfGmp00noEmPipq');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello get data successfully')
})


app.post('/payment-sheet', async (req, res) => {
  try {
    const { customer, amount, currency } = req.body;

    let customerId;
    if (customer) {
      customerId = customer;
    } else {
      const customerObj = await stripe.customers.create();
      customerId = customerObj.id;
    }

    async function createPaymentIntent(customerId, amount, currency) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        payment_method_types: ['card'],
      });
      //res.json(paymentIntent);
      return paymentIntent;
    }

    async function chargeCustomer(paymentIntentId, paymentMethodId) {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
      });
      return paymentIntent;
    }

    async function retrievePaymentIntent(paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    }

    async function listPaymentMethods(customerId) {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });
      return paymentMethods;
    }

    const paymentIntent = await createPaymentIntent(customerId, amount, currency);
    console.log('Payment Intent created: ', paymentIntent.id);

    const paymentMethods = await listPaymentMethods(customerId);
    console.log('Payment Methods: ', paymentMethods.data.map(pm => pm.id));

    const paymentMethodId = paymentMethods.data[0].id;

    const chargedPaymentIntent = await chargeCustomer(paymentIntent.id, paymentMethodId);
    console.log('Payment Intent charged: ', chargedPaymentIntent.id);

    const retrievedPaymentIntent = await retrievePaymentIntent(paymentIntent.id);
    console.log('Payment Intent retrieved: ', retrievedPaymentIntent.id);

    //console.log(req.body);

    // Send the response to the client
    res.json({
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send({ error: 'An unexpected error occurred' });
  }
});

app.listen(4002, () => console.log("Running on http://localhost:4002"))

