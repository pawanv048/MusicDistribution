import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { CardField, useStripe, createToken, paymentIndent, confirmPayment } from '@stripe/stripe-react-native';
import { TextButton } from '../custom/component';
import { createPaymentIntent } from '../api/stripeApis';


const PaymentScreen = () => {

  const [cardInfo, setCardInfo] = useState(null);

  const fetchCardDetails = (cardDetail) => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail)
    } else {
      setCardInfo(null)
    }
  }

  const onPressDone = async () => {

    let apiData = {
      amount: 5010,
      currency: 'INR'
    }

    try {
      const res = await createPaymentIntent(apiData)
      //console.log('Payment intent create successfully..!!',res)

      if (res?.data?.paymentIntent) {
        let confirmPaymentIndent = await confirmPayment(res?.data?.paymentIntent, { paymentMethodType: 'Card' })
        console.log("Confirm payment indent+", confirmPaymentIndent)
        alert('Payment done Successfully!!')
      }
    } catch (error) {
      console.log("Error rasing during payment indent", error)
    }

    // if(!!cardInfo){
    //   try {
    //     const respToken = await createToken({...cardInfo, type: 'Card'})
    //     console.log(respToken);
    //   } catch (error) {
    //     alert('Error rasied during response Token')
    //   }
    // }
  }

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderWidth: 1,
          borderColor: '#000000',
          borderRadius: 10,
        }}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          fetchCardDetails(cardDetails)
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
      <TextButton
        label={'DONE'}
        contentContainerStyle={{ marginHorizontal: 20 }}
        onPress={onPressDone}
        disabled={!cardInfo}
      />
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({})


