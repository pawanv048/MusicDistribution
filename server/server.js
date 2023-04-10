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
  // Use an existing Customer ID if this is a returning customer.
  const { amount, currency } = req.body;
  // const customer = await stripe.customers.create();

  // CREATE CUSTOMER
  async function createCustomer(name, email, description) {
    const customer = await stripe.customers.create({
      name: name,
      email: email,
      description: description
      //payment_method: paymentMethodId
    });

    return customer;
  }

  // CUSTOMER DETAILS
  const customer = await stripe.customers.retrieve('cus_Ngb468LTKUdMsY');
  // console.log(customer);
  // console.log(customer.name);
  // console.log(customer.email);
  // console.log('Calling createCustomer function');
  // createCustomer('will Smith', 'will.will@example.com', 'i have done').then(customer => {
  //   console.log(customer);
  // }).catch(err => {
  //   console.error(err);
  // });

  async function createToken(card) {
    try {
      const token = await stripe.tokens.create({
        card: card,
      });
      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // const card = {
  //   number: '4242424242424242',
  //   exp_month: 12,
  //   exp_year: 2024,
  //   cvc: '123',
  // };


  // createToken(card)
  //   .then(token => {
  //     console.log(token);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });

  // ADDING NEW PAYMENT SOURCE TO THE CUSTOMER
  async function addPaymentSourceToCustomer(customerId, cardNumber, expMonth, expYear, cvc) {
    try {
      // create a card token
      const token = await stripe.tokens.create({
        card: {
          number: cardNumber,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc
        }
      });

      // add the card as a payment source to the customer
      const card = await stripe.customers.createSource(customerId, {
        source: token.id
      });

      console.log('New payment source added to customer:', card);
      return card;
    } catch (err) {
      console.error('Error adding payment source to customer:', err);
      throw err;
    }
  }


  // const customerId = 'cus_Ngb0mvhfTjOUAC'; // replace with the ID of an existing customer
  // const cardNumber = '4242424242424242';
  // const expMonth = '12';
  // const expYear = '2025';
  // const cvc = '123';

  // addPaymentSourceToCustomer(customerId, cardNumber, expMonth, expYear, cvc)
  //   .then(card => {
  //     // do something with the newly added card
  //     console.log(card)
  //   })
  //   .catch(err => {
  //     // handle errors
  //     console.log(err)
  //   });

  console.log('charging customer through its id');

  async function attachPaymentMethodToCustomer(customerId, paymentMethodId) {
    try {
      const paymentMethod = await stripe.paymentMethods.attach(
        paymentMethodId,
        { customer: customerId }
      );
      return paymentMethod;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function createStripePaymentMethod(cardElement) {
    try {
      // Create a new payment method using Stripe Elements
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      // Handle any errors that occur
      if (error) {
        console.error(error);
        throw error;
      }
  
      // Retrieve the payment method ID from the payment method object
      const paymentMethodId = paymentMethod.id;
  
      return paymentMethodId;
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      throw error;
    }
  }
  
console.log('Charge customer');

async function createPaymentIntent(customerId) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'inr',
    customer: customerId,
    payment_method_types: ['card'],
  });
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

async function run() {
  const customerId = 'cus_Ngb0mvhfTjOUAC';

  const paymentIntent = await createPaymentIntent(customerId);
  console.log('Payment Intent created: ', paymentIntent.id);

  const paymentMethods = await listPaymentMethods(customerId);
  console.log('Payment Methods: ', paymentMethods.data.map(pm => pm.id));

  const paymentMethodId = paymentMethods.data[0].id;

  const chargedPaymentIntent = await chargeCustomer(paymentIntent.id, paymentMethodId);
  console.log('Payment Intent charged: ', chargedPaymentIntent.id);

  const retrievedPaymentIntent = await retrievePaymentIntent(paymentIntent.id);
  console.log('Payment Intent retrieved: ', retrievedPaymentIntent.id);
}

//run();

  // const ephemeralKey = await stripe.ephemeralKeys.create(
  //   { customer: customer.id },
  //   { apiVersion: '2022-11-15' }
  //   // { apiVersion: req.headers['2022-11-15'] }
  // );


  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: amount,
  //   currency: currency,
  //   customer: customer.id,
  //   automatic_payment_methods: {
  //     enabled: true,
  //   },
  // });

  // res.json({
  //   clientSecret: paymentIntent.client_secret,
  //   paymentIntent: paymentIntent.client_secret,
  //   ephemeralKey: ephemeralKey.secret,
  //   customer: customer.id,
  // });

});


app.listen(4002, () => console.log("Running on http://localhost:4002"))






















