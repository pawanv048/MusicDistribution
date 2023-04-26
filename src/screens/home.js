import React, {useEffect} from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StyleSheet, Text, View, Button } from "react-native";
import useDetailData from "../context/useDetailData";
import PaymentScreen from './PaymentScreen';

export default function Home(props) {
  console.log('render Home');
  //console.log('renderHomeScreen')
  const route = props.route;
  const{ Release_Id } = route.params

  // const {valueToPass, setValueToPass} = useDetailData();
  
  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51My6FhSEXddR3UfQXg3kVXaJ0TsigOVzQ4uRYoEe2KLPRfmonKGLtzS0kvZnwg5m8VfTOenHSflpdYEJwB8llinR0026c27Q15">
        <PaymentScreen
          navigation={props.navigation}
          Release_Id={route.params.Release_Id} // Pass Release_Id as a prop
          Release_Artwork={route.params.Release_Artwork} // Pass Release_Artwork as a prop
          //lang={lang}
          //valueToPass={valueToPass} // Pass valueToPass as a prop
        />
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

