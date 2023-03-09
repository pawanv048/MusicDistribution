import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { S_KEY } from "@env";

import PaymentScreen from './PaymentScreen';


const Home = () => {

  return (
    <View>
      <StripeProvider
        publishableKey={S_KEY}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <PaymentScreen />
      </StripeProvider>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({})