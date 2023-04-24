import React, {useEffect} from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StyleSheet, Text, View, Button } from "react-native";
import useDetailData from "../context/useDetailData";
import PaymentScreen from './PaymentScreen';

export default function Home(props) {
  //console.log('renderHomeScreen')
  const route = props.route;
  const{ Release_Id } = route.params


  // const Artwork = route.params.Release_Artwork ?? '3f717fef-2d3b-4d87-a8a9-51c707827b23.jpg';
  // if (!Artwork) {
  //   Release_Artwork = '3f717fef-2d3b-4d87-a8a9-51c707827b23.jpg';
  // }

  // const id = route.params.Release_Id
  //console.log(id);
  //console.log(Release_Id);
  //const releaseId = item?.Release_Id;
 // console.log(Release_Artwork);

  const {valueToPass, setValueToPass} = useDetailData();
  //console.log('Release_id:', valueToPass)
  

  const getRelease = async () => {
    try {
      const resp = await fetch(
        `http://84.16.239.66/api/Release/GetReleasesDetails?ReleaseId=${releaseId}`,
      );

      //console.log('ReleaseId123=', detailsData?.Release_Id);
      const json = await resp.json();
      setValueToPass(json.Data);
      //console.log('fetchDetailsUsingReleaseId12=', JSON.stringify(json.Data));
    } catch (error) {
      console.error(error);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    //getRelease();
    //postUser();
  }, []);
  
  
  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51My6FhSEXddR3UfQXg3kVXaJ0TsigOVzQ4uRYoEe2KLPRfmonKGLtzS0kvZnwg5m8VfTOenHSflpdYEJwB8llinR0026c27Q15">
        <PaymentScreen
          navigation={props.navigation}
          Release_Id={route.params.Release_Id} // Pass Release_Id as a prop
          Release_Artwork={route.params.Release_Artwork} // Pass Release_Artwork as a prop
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

