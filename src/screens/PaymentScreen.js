import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
  Button,
  ScrollView,
  TextInput,
  Linking,
  SafeAreaView
} from 'react-native';
import {
  CardField,
  useStripe,
  createToken,
  paymentIndent,
  confirmPayment,
  usePaymentSheet,
  AddressDetails
} from '@stripe/stripe-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { TextButton, SearchComponent, CustomText, CustomLoader } from '../custom/component';
import { useAddPurchaseDetailMutation } from '../redux/DrawerApiCall';
import { playTrack, pauseTrack } from '../custom/AudioPlayer';
import { API, releaseUrl } from '../api/apiServers';
import { selectEmail } from '../redux/userSlice';
import { COLORS, SIZES } from '../constants/theme';
import icons from '../constants/icons';



import { LogBox } from 'react-native';
import Screen from '../custom/Screen';
import { ThemeContext } from '../utils/theme-context';
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

// Your code here


const PaymentScreen = (props) => {
  console.log('render Payment');
  const {
    Release_Id = 31939,
    Release_Artwork = '79b94356-7690-4dfd-b01c-c5e1386e88e2.jpg'
  } = props;
  //  console.log('Release_Id:',Release_Id);

  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);


  const [cardInfo, setCardInfo] = useState(null);
  const [trackData, setTrackData] = useState([]);
  // console.log(trackData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [cardDetailsEntered, setCardDetailsEntered] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const email = useSelector(selectEmail);
  //console.log('email=>',email);

  // addPurchaseDetail is a function that is use post used id
  const [addPurchaseDetail] = useAddPurchaseDetailMutation();

  // STRIPE HOOKS
  const stripe = useStripe();
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('Dashboard');
  };



  // OPENING PAYMENT SHEET
  const subscribe = async () => {


    try {
      // sending request
      const response = await fetch("http://localhost:4002/pay", {
        method: "POST",
        //body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: 'rohit123@gmail.com',
          amount: 1000
        }),
      });
      const data = await response.json();
      // console.log('Public key:', data); 
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        billingDetailsCollectionConfiguration: {
          name: 'jdsfhkjds',
          email: 'sdfsdf@gmail.com',
          address: 'ksjfklsjdlfkj',
          attachDefaultsToPaymentMethod: true
        },
        // defaultShippingDetails: {
        //   name: "rohit", // Replace with the customer's name
        //   address: {
        //     line1: "Address Line 1", // Replace with the customer's address line 1
        //     line2: "Address Line 2", // Replace with the customer's address line 2 (optional)
        //     city: "Sacramento", // Replace with the customer's city
        //     state: "California", // Replace with the customer's state
        //     postal_code: "94203", // Replace with the customer's postal code
        //     country: "US", // Replace with the customer's country
        //   },
        // }
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,

      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);

      // Payment is successful, call the mutation
      const res = await addPurchaseDetail({
        ReleaseId: Release_Id,
        customer: "smaith@gmail.com",
        PaymentStatus: "paid",
        UserId: "5819A966-F236-4B85-B902-A6E890E38B47",
        Amount: "500",
        CardType: "master",
        Currency: "usd"
      });
      console.log(res);
      Alert.alert("Payment complete, thank you!");
      await downloadAllTracks();
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  // SEARCH HANDLER
  // const handleSearch = (searchQuery) => {
  //   if (!searchQuery) {
  //     setTopReleaseList(topRelease);
  //   } else {
  //     const firstLetter = searchQuery.trim()[0].toLowerCase();
  //     const topReleaseList = topRelease.filter((item) => {
  //       const itemData = item.Release_ReleaseTitle.trim().toLowerCase() ?? '';
  //       if (itemData[0] === firstLetter) {
  //         return itemData.includes(searchQuery.trim().toLowerCase());
  //       }
  //       return false;
  //     });
  //     const topReleaseListWithIndex = topReleaseList.map((item) => {
  //       const index = topRelease.findIndex((el) => el.id === item.id);
  //       return { ...item, index };
  //     });
  //     if (topReleaseListWithIndex.length > 0) {
  //       setTopReleaseList(topReleaseListWithIndex);
  //     } else {
  //       alert(`No matching element found for '${searchQuery}'.`);
  //     }
  //   }
  // };



  // DOWNLOADING TRACKS

  const downloadAllTracks = async () => {
    // console.log('button clicked')
    try {
      const downloads = [];
      for (let i = 0; i < trackData.length; i++) {
        const track = trackData[i];
        //console.log(track);
        const downloadDest = `${RNFetchBlob.fs.dirs.DocumentDir}/${track.Track_Title}.wav`;
        const audioUrl = `${track.Track_RootUrl}${track.Track_AudioFile}`;
        //console.log(audioUrl);
        //console.log("downloadDest:", downloadDest);
        const response = await RNFetchBlob.config({ path: downloadDest }).fetch('GET', audioUrl);
        // console.log("response:", response);
        downloads.push(downloadDest);
      }

      console.log('All tracks downloaded successfully: ', downloads);
      //return downloads;
    } catch (error) {
      console.log('Error downloading tracks: ', error);
    }
  };


  // LIST OF TRACKS

  const getAllTrack = useCallback(() => {
    setLoading(true)
    API({
      url: `http://84.16.239.66/GetTracks?ReleaseId=${Release_Id}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      onSuccess: val => {
        setTrackData(val?.Data);
        setLoading(false)
      },
      onError: err => console.log('Error fetching track data:', err),
    });
  }, [Release_Id]);

  useEffect(() => {
    getAllTrack()
  }, [Release_Id]);



  // TRACKS
  const renderTrackList = () => {

    return (
      <View style={styles.card}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
            color: COLORS.support1,
            marginBottom: 15
          }}
        >DASHBOARD
        </Text>
        <SearchComponent

        />
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Image
            source={icons.exit}
            style={{
              width: 18,
              height: 18,
              tintColor: 'rgba(10,47,74,1)',
              marginRight: 5
            }}
          />
          <CustomText
            label={'Sign Up'}
            labelStyle={{ marginRight: 10 }}
            onPress={() => navigation.navigate('Register')}
          />
          <Image
            source={icons.exit}
            style={{
              width: 18,
              height: 18,
              tintColor: 'rgba(10,47,74,1)',
              marginRight: 5
            }}
          />
          <CustomText
            label={'Logout'}
            onPress={() => navigation.navigate('Register')}
          />
        </View>

        {/* <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '900',
              marginBottom: SIZES.padding,
              color: 'rgb(17,52,85)'
            }}>
            Best episodes of the week!
          </Text>
          <Separator
            lineContainer={{
              width: '50%',
              height: 5
            }} />
          <Separator
            lineContainer={{
              width: '38%',
              height: 5,
              marginTop: 5
            }} />
        </View> */}


        {/* SHOWING TRACK LIST */}
        {isLoading ?
          <CustomLoader /> :
          <ScrollView
            horizontal={true}
            style={{ marginTop: SIZES.padding * 2 }}
          >
            {trackData.map((trackList, index) => (
              <View
                key={trackList.Track_Id}
                style={{
                  alignItems: 'center',
                  width: SIZES.width - 100,
                  height: SIZES.height / 2.7,
                  marginRight: index === trackData.length - 1 ? 0 : 15,
                  borderRadius: 10
                }}
              >
                <FastImage
                  source={{
                    uri: `${releaseUrl}${Release_Artwork}`,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(243,243,243,1)',
                    height: 120,
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: 10,
                    padding: 20
                  }}
                >
                  <Text>{trackList.Track_Artist}</Text>
                </View>
              </View>
            ))}
          </ScrollView>}

        <TextButton
          //onPress={() => downloadAllTracks(tracks)}
          onPress={subscribe}
          //onPress={handlePayment}
          label={'Payment'}
        />
        {/* {isSuccess !== '' && (
          <Text>payment success added in history</Text>
        )} */}

        {/* COPYRIGHTS */}
        <View>
          <Text style={[styles.artistTxt, { textAlign: 'left' }]}>© 2023 Music Media Limited All rights reserved.</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={[styles.artistTxt, { textAlign: 'left' }]}>Follow Us</Text>
            <Image
              source={icons.facebook}
              style={styles.socialIcons}
            />
            <Image
              source={icons.google}
              style={styles.socialIcons}
            />
            <Image
              source={icons.linkdin}
              style={styles.socialIcons}
            />
            <Image
              source={icons.twitter}
              style={styles.socialIcons}
            />
          </View>
        </View>
      </View>
    )
  };



  // MAIN VIEW
  return (
    <Screen
      contentContainerStyle={{ margin: SIZES.padding * 2, paddingBottom: 100 }}
    >
      {renderTrackList()}
      <TouchableOpacity
        style={{
          alignSelf: 'center'
        }}
        onPress={handleNavigation}
      >
        <Text>Dashboard</Text>
      </TouchableOpacity>
    </Screen>
  )
}


const getStyles = (theme) =>

  StyleSheet.create({
    card: {
      backgroundColor: COLORS.light,
      paddingHorizontal: SIZES.padding * 2,
      paddingTop: SIZES.padding * 3,
      height: SIZES.height / 1.2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 8.65,
      borderRadius: 10,
    },
    artistTxt: {
      fontSize: 18,
      fontWeight: '400',
      color: COLORS.support1,
      marginVertical: SIZES.padding,
    },
    socialIcons: {
      height: 15,
      width: 15,
      tintColor: COLORS.support1,
      marginHorizontal: SIZES.padding
    },
  })


export default PaymentScreen;