import React, { useState, useEffect, useCallback } from 'react';
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
  Linking
} from 'react-native';
import {
  CardField,
  useStripe,
  createToken,
  paymentIndent,
  confirmPayment,
  usePaymentSheet
} from '@stripe/stripe-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { TextButton, SearchComponent, CustomText, Separator } from '../custom/component';
import { API } from '../api/stripeApis';
import { COLORS, SIZES } from '../constants/theme';
import { useDetailData } from '../context/useDetailData';
import { playTrack, pauseTrack } from '../custom/AudioPlayer';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

// Your code here


const image = 'https://cdn.pixabay.com/photo/2016/11/18/18/35/adult-1836322_960_720.jpg';
const play = 'https://cdn-icons-png.flaticon.com/512/189/189638.png';
const pause = 'https://cdn-icons-png.flaticon.com/512/6364/6364353.png';

const facebook = 'https://cdn-icons-png.flaticon.com/512/1051/1051309.png';
const google = 'https://cdn-icons-png.flaticon.com/512/60/60818.png';
const linkdin = 'https://cdn-icons-png.flaticon.com/512/61/61109.png';
const twitter = 'https://cdn-icons-png.flaticon.com/512/25/25347.png';
const exit = 'https://cdn-icons-png.flaticon.com/512/8983/8983815.png';

const PaymentScreen = (props) => {
  // console.log('PaymentScreen rendering');
  //const { valueToPass } = props;
  const { Release_Id, Release_Artwork } = props;
  // console.log('Release_Artwork:',Release_Artwork);

  const [cardInfo, setCardInfo] = useState(null);
  const [trackData, setTrackData] = useState([]);
  // console.log(trackData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [cardDetailsEntered, setCardDetailsEntered] = useState(false);

  //payment
  // const [name, setName] = useState("");
  const stripe = useStripe();
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('Dashboard');
  };


  const [paymentIntent, setPaymentIntent] = useState(null);
  //const { createPaymentSheet, presentPaymentSheet } = useStripe();
  const [ready, setReady] = useState(false)

  //  const {initPaymentSheet, presentPaymentSheet} = useStripe()


  const fetchPaymentSheetParams = async () => {
    //STRIPE_SECRET_KEY='sk_test_51Mix02SImlbs6lSYBt2B1OYwdWc9te2H0njDJ01ioVxbhdAWaIYumQLu4OUTWepHZLjT4vjU4pu3teJ8WixgfGmp00noEmPipq'
    const response = await fetch(`http://localhost:4002/payment-sheet`, {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: 'cus_NiBV90HhDhqJ6G',
        amount: 1000, // amount in cents
        email: 'rohit@gmail.com',
        name: 'Rohit',
        cardNumber: '4242424242424242',
        cardExpMonth: '12',
        cardExpYear: '2025',
        cardCvc: '123',
      })
    });
    const { paymentIntent, customer } = await response.json();

    return {
      paymentIntent,
      customer,
    };
  };




  const initializePaymentSheet = async () => {
    try {
      const {
        paymentIntent,
        customer,

      } = await fetchPaymentSheetParams();

      console.log('paymentIntent:', paymentIntent);
      //console.log('ephemeralKey:', ephemeralKey);
      console.log('customer:', customer);
      // console.log('publishableKey:', publishableKey);
      // console.log('clientSecret:', clientSecret);

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        //customerEphemeralKeySecret: ephemeralKey,
        //paymentIntentClientSecret: clientSecret,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });

      if (error) {
        Alert.alert(`Error Code: ${error.code || ''}`, error.message)
        //setLoading(true);
      } else {
        setReady(true)
      }
    } catch (err) {
      console.error('Error initializing payment sheet:', err);
    }
  }

  // const subscribe = async () => {
  //   try {
  //     //const apiKey= 'https://hooks.stripe.com/redirect/authenticate/src_1MxlguSImlbs6lSYOuN3Cf1R?client_secret=src_client_secret_akLxWPpiq4VsPFI6JHF1uKVa&source_redirect_slug=test_YWNjdF8xTWl4MDJTSW1sYnM2bFNZLF9OakU5V0RoMjhEcHB2RzhTYkdyZ1d1MVd1alV4OUN50100bRqr4sVL'
  //     // sending request
  //     const response = await fetch("http://localhost:4002/payment-sheet", {
  //       method: "POST",
  //       headers: {
  //        // "Authorization": `Bearer ${apiKey}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         customerId: 'cus_NjDpNzKjBAoY6J',
  //         amount: 1000, // amount in cents
  //         email: 'amit@gmail.com',
  //         name: 'Amit',
  //         cardNumber: '4242424242424242',
  //         cardExpMonth: '12',
  //         cardExpYear: '2025',
  //         cardCvc: '123',
  //       })
  //     });
  //     const data = await response.json();
  //     //console.log(data)
  //     if (!response.ok) return Alert.alert(data.message);
  //     const clientSecret = data.paymentIntent;
  //     const emkey = data.ephemeralKey
  //    // console.log(emkey);
  //     const initSheet = await stripe.initPaymentSheet({
  //       paymentIntentClientSecret: clientSecret,
  //       customerEphemeralKeySecret: emkey,
  //       returnURL: 'https://mobile.mycompany.com/callback'
  //     });
  //     if (initSheet.error) return Alert.alert(initSheet.error.message);
  //     const presentSheet = await stripe.presentPaymentSheet({
  //       clientSecret,
  //       //emkey
  //     });
  //     if (presentSheet.error) return Alert.alert(presentSheet.error.message);
  //     Alert.alert("Payment complete, thank you!");
  //   } catch (err) {
  //     console.error(err);
  //     Alert.alert("Something went wrong, try again later!");
  //   }
  // };

  const subscribe = async () => {
    try {
      // sending request
      const response = await fetch("http://localhost:4002/pay", {
        method: "POST",
        //body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      //console.log('Public key:', data); 
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment complete, thank you!");
      await downloadAllTracks();
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };






  // useEffect(() => {
  //   initializePaymentSheet()
  // },[])

  // async function buy() {
  //   const { error } = await presentPaymentSheet()

  //   if (error) {
  //     Alert.alert(`Error Code: ${error.code || ''}`, error.message)
  //     //alert('not success')
  //     // setLoading(true);
  //   } else {
  //     Alert.alert('Success', 'your payment successful')
  //     setReady(false)
  //   }
  // }
  //  console.log('cardInfo =>', cardInfo)


  // TRACK KEYS 

  // const tracks = trackData.map((trackList) => {
  //   const currentTrack = trackList?.Tracks;
  //   if (!currentTrack) return null;

  //   const url = currentTrack?.Track_RootUrl && currentTrack?.Track_AudioFile ? currentTrack.Track_RootUrl + currentTrack.Track_AudioFile : '';
  //   const title = currentTrack?.Track_Title || '';
  //   const artist = currentTrack?.Track_Artist || '';
  //   const genre = currentTrack?.Track_SubGenre || '';
  //   const date = currentTrack?.Track_Date || '';

  //   return {
  //     id: String(currentTrack?.Track_Id || ''),
  //     url,
  //     title,
  //     artist,
  //     album: '',
  //     genre,
  //     date,
  //     artwork: '', // add artwork url if available
  //     duration: 0
  //   };

  // }).filter(Boolean);


  // TRACKS PLAY AND PAUSE

  const handleTogglePlay = (index) => {
    const selectedTrack = tracks[index];
    // console.log('selectedTrack =>', selectedTrack);
    if (isPlaying && currentIndex === index) {
      // console.log('url =>',selectedTrack.url)
      // console.log('isPlaying =>',isPlaying)
      // console.log('currentIndex =>',currentIndex)

      pauseTrack(selectedTrack.url);
      setIsPlaying(false);
      setCurrentIndex(null);
    } else {
      if (currentIndex != null) {
        const prevTrack = tracks[currentIndex];
        // console.log('prevTrack =>', prevTrack)
        pauseTrack(prevTrack.url);
      }
      //playTrack(selectedTrack.url);
      //console.log('Tracks: ', tracks); // Add this line
      playTrack(tracks[index]);
      // playTrack(track);
      // console.log("playTrack =>",selectedTrack.url )
      setIsPlaying(true);
      setCurrentIndex(index);
    }
  };
  // end



  // DOWNLOADING TRACKS

  const downloadAllTracks = async () => {
    console.log('button clicked')
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


  //end

  // console.log(tracks)

  // player testing end

  // console.log(trackData, 'hello');

  const fetchCardDetails = (cardDetail) => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail)
    } else {
      setCardInfo(null)
    }
  }

  // http://84.16.239.66/api/Release/GetReleasesDetails?ReleaseId=80663

  // console.log(releaseId);

  // GETTING ALL THE TRACKS ON THE BASIC OF RELEASE ID
  // const getAllTrack = () => {
  //   //console.log('calling api')
  //   API({
  //     url: `http://84.16.239.66/GetTracks?ReleaseId=${Release_Id}`,
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //     onSuccess: val => {
  //        //console.log('Track data ==>', val?.Data)
  //       setTrackData(val?.Data)
  //     },
  //     onError: err => console.log('Error fetching track data:', err),
  //   });
  //   //setLoading(true);
  // };

  const getAllTrack = useCallback(() => {
    API({
      url: `http://84.16.239.66/GetTracks?ReleaseId=${Release_Id}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      onSuccess: val => {
        setTrackData(val?.Data);
      },
      onError: err => console.log('Error fetching track data:', err),
    });
  }, [Release_Id]);

  useEffect(() => {
    getAllTrack()
  }, [Release_Id]);


  // PAYMENT DONE 

  const createPaymentIntent = async (apiData) => {
    return new Promise((resolve, reject) => {
      API({
        url: 'http://localhost:4002/payment-sheet',
        method: 'POST',
        params: apiData,
        onSuccess: (response) => {
          //console.log(response);
          //console.log('Payment intent created: ', response.paymentIntentId);
          resolve(response.paymentIntentId);
        },
        onError: (error) => {
          console.log('Error creating payment intent: ', error);
          reject(error);
        },
      });
    });
  };


  const onPressDone = async () => {

    let apiData = {
      customer: "cus_Ngb468LTKUdMsY",
      amount: 1300,
      currency: "inr"
    }

    try {
      const res = await createPaymentIntent(apiData)
      console.log('Payment intent create successfully..!!', res)
      // if (res?.data?.paymentIntent) {
      //   let confirmPaymentIndent = await confirmPayment(res?.data?.paymentIntent, { paymentMethodType: 'Card' })
      //   console.log("Confirm payment indent+", confirmPaymentIndent)
      //   alert('Payment done Successfully!!')
      //   setCardDetailsEntered(true);
      // }
    } catch (error) {
      console.log("Error rasing during payment indent", error)
    }
  };



  const renderContent = () => {

    return (
      <View style={{ flexDirection: 'row' }}>
        <FastImage
          source={{
            uri: `https://musicdistributionsystem.com/release/${item.Release_Artwork}`,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            marginRight: SIZES.padding
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={{
            margin: SIZES.padding
          }}>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 20,
              fontWeight: '500'
            }}>
            {item.Release_ReleaseTitle}
          </Text>
          {/* <Text>{item.Release_Id}</Text> */}
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              //marginRight: 50,
              lineHeight: 20,
              flexWrap: 'wrap' // add flexWrap property to wrap the text to the next line
            }}>
            {item.Release_PrimaryArtist.length > 14 ?
              `${item.Release_PrimaryArtist.slice(0, 14)}\n${item.Release_PrimaryArtist.slice(14)}` :
              item.Release_PrimaryArtist
            }
          </Text>

          <TouchableOpacity
            onPress={() => downloadAllTracks(tracks)}
            style={{
              backgroundColor: COLORS.primary,
              width: 100,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              borderRadius: 5
            }}
          >
            <Text>Buy</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  };



  // TRACKS
  const renderTrackList = () => {

    // TRACK LISTING
    const renderTrackItems = ({ item, index }) => {
      return (
        <View
          key={item.Tracks.Track_Id}
        //style={{backgroundColor: 'red', flex: 1, height: 20}}
        //style={{ flexDirection: 'row', margin: 20, alignItems: 'center' }}
        >
          {/* <TouchableOpacity
            // onPress={() => playTrack(track)}
            // onPress={() => handlePlayPause(index, trackUrl)}
            key={`audio-btn-play-${index}`}
            onPress={() => handleTogglePlay(index)}
            style={{
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 20,
            }}>
            <Image
              source={currentIndex === index && isPlaying ? { uri: pause } : { uri: play }}
              //source={{uri: playbtn}}
              style={{
                height: 40,
                width: 40,
              }}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 20 }}>{item?.Tracks?.Track_Artist}</Text> */}
        </View>
      )
    };


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
        <SearchComponent />
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Image
            source={{ uri: exit }}
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
            source={{ uri: exit }}
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

        <View style={{ marginTop: 20 }}>
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
        </View>


        {/* SHOWING TRACK LIST */}
        <ScrollView
          horizontal={true}
          style={{ marginTop: SIZES.padding * 2 }}
        >
          {trackData.map((trackList, index) => (
            <View
              key={trackList.Track_Id}
              style={{
                //marginHorizontal: SIZES.padding,
                alignItems: 'center',
                width: SIZES.width - 100,
                height: SIZES.height / 2.7,
                marginRight: index === trackData.length - 1 ? 0 : 15,
                //margin: SIZES.padding * 2,
                //backgroundColor: 'red',
                borderRadius: 10
              }}
            >
              <FastImage
                source={
                  {
                    uri: `https://musicdistributionsystem.com/release/${Release_Artwork}`,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable,
                  }
                }
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
        </ScrollView>

        <TextButton
          //onPress={() => downloadAllTracks(tracks)}
          onPress={subscribe}
          label={'Payment'}
        />

        {/* COPYRIGHTS */}
        <View>
          <Text style={[styles.artistTxt, { textAlign: 'left' }]}>© 2023 Music Media Limited All rights reserved.</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={[styles.artistTxt, { textAlign: 'left' }]}>Follow Us</Text>
            <Image
              source={{ uri: facebook }}
              style={styles.socialIcons}
            />
            <Image
              source={{ uri: google }}
              style={styles.socialIcons}
            />
            <Image
              source={{ uri: linkdin }}
              style={styles.socialIcons}
            />
            <Image
              source={{ uri: twitter }}
              style={styles.socialIcons}
            />
          </View>
        </View>

        <FlatList
          data={trackData}
          keyExtractor={item => item.Track_Id.toString()}
          style={{ padding: SIZES.padding }}
        //renderItem={renderTrackItems}
        //contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3, marginBottom: SIZES.padding * 2 }}
        />
      </View>
    )
  };




  return (
    <ScrollView
      style={{ padding: SIZES.padding * 1.5, flex: 1 }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* {renderContent()} */}
      {renderTrackList()}
      {/* <CardField
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
          height: 60,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          fetchCardDetails(cardDetails)
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      /> */}

      {/* <TextButton
        label={'DONE'}
        contentContainerStyle={{ marginHorizontal: 20 }}
        onPress={onPressDone}
        // onPress={createPaymentIntent}
        disabled={!cardInfo}
      /> */}

      {/* <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
        style={{
          width: 300,
          fontSize: 20,
          padding: 10,
          borderWidth: 1,
        }}
      /> */}
      <TouchableOpacity
        style={{
          alignSelf: 'center'
        }}
        onPress={handleNavigation}
      >
        {/* <Text>Dashboard</Text> */}

      </TouchableOpacity>
      {/* <Button title='download' onPress={downloadAllTracks}/> */}
      {/* {trackData.map((track) => console.log(track?.Tracks?.Track_Id))} */}
    </ScrollView>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.light,
    //height: SIZES.height / 1.6,
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding * 3,
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
    //textAlign: 'center'
  },
  socialIcons: {
    height: 15,
    width: 15,
    tintColor: COLORS.support1,
    marginHorizontal: SIZES.padding
  },
})