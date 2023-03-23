import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert
} from 'react-native';
import {
  CardField,
  useStripe,
  createToken,
  paymentIndent,
  confirmPayment
} from '@stripe/stripe-react-native';

import FastImage from 'react-native-fast-image';
import { TextButton } from '../custom/component';
import { API, createPaymentIntent } from '../api/stripeApis';
import { COLORS, SIZES } from '../constants/theme';
import { useDetailData } from '../context/useDetailData';
import { playTrack, pauseTrack } from '../custom/AudioPlayer';
import RNFetchBlob from 'rn-fetch-blob';
import {Secret_key} from '@env';



const image = 'https://cdn.pixabay.com/photo/2016/11/18/18/35/adult-1836322_960_720.jpg';
const play = 'https://cdn-icons-png.flaticon.com/512/189/189638.png';
const pause = 'https://cdn-icons-png.flaticon.com/512/6364/6364353.png';

const PaymentScreen = ({ navigation, route }) => {

  // const releaseDatas = route.params
  const { item } = route.params;
  const releaseId = item?.Release_Id;

  //  console.log(releaseId);
  // alert(JSON.stringify(item))

  const [cardInfo, setCardInfo] = useState(null);
  const [trackData, setTrackData] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null);
  const [cardDetailsEntered, setCardDetailsEntered] = useState(false);



  // TRACK KEYS 

  const tracks = trackData.map((trackList) => {
    const currentTrack = trackList?.Tracks;
    if (!currentTrack) return null;

    const url = currentTrack?.Track_RootUrl && currentTrack?.Track_AudioFile ? currentTrack.Track_RootUrl + currentTrack.Track_AudioFile : '';
    const title = currentTrack?.Track_Title || '';
    const artist = currentTrack?.Track_Artist || '';
    const genre = currentTrack?.Track_SubGenre || '';
    const date = currentTrack?.Track_Date || '';

    return {
      id: String(currentTrack?.Track_Id || ''),
      url,
      title,
      artist,
      album: '',
      genre,
      date,
      artwork: '', // add artwork url if available
      duration: 0
    };

  }).filter(Boolean);

  // await playTrack(track);



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

  const downloadAllTracks = async (tracks) => {
    console.log('button clicked')
    if (!cardDetailsEntered) {
      alert('Please enter card details and click "Done" before purchasing.');
      return;
    }
    try {
      const downloads = [];

      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        const downloadDest = `${RNFetchBlob.fs.dirs.DocumentDir}/${track.title}.wav`;
        const response = await RNFetchBlob.config({ path: downloadDest }).fetch('GET', track.url);
        downloads.push(downloadDest);
      }

      console.log('All tracks downloaded successfully: ', downloads);
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
  const getAllTrack = () => {
    //console.log('calling api')
    API({
      url: `http://84.16.239.66/api/Release/GetReleasesDetails?ReleaseId=${releaseId}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      onSuccess: val => {
        // console.log('Track data ==>', val?.Data)
        setTrackData(val?.Data)
      },
      onError: err => console.log('Error fetching track data:', err),
    });
    //setLoading(true);
  };

  useEffect(() => {
    getAllTrack()
  }, []);

// PAYMENT PROCESS 

// const confirmPayment = async (paymentIntentId, options) => {
//   const response = await fetch(`https://api.stripe.com/v1/payment_intents/${paymentIntentId}/confirm`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': `Bearer ${Secret_key}`
//     },
//     body: toQueryString(options)
//   });

//   return await response.json();
// };


  const onPressDone = async () => {
    let apiData = {
      amount: 5000,
      currency: 'INR'
    }
    try {
      const res = await createPaymentIntent(apiData)
      //console.log('Payment intent create successfully..!!',res)

      if (res?.data?.paymentIntent) {
        let confirmPaymentIndent = await confirmPayment(res?.data?.paymentIntent, { paymentMethodType: 'Card' })
        console.log("Confirm payment indent+", confirmPaymentIndent)
        alert('Payment done Successfully!!')
        setCardDetailsEntered(true);
      }
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
            width: 150,
            height: 150,
            resizeMode: FastImage.resizeMode.cover,
            borderRadius: 15
          }}
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
          <Text>{item.Release_Id}</Text>
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


    return (
      <FlatList
        data={trackData}
        keyExtractor={item => item.Tracks.Track_Id.toString()}
        style={{ padding: SIZES.padding }}
        renderItem={({ item, index }) => {

          return (
            <View
              key={item.Tracks.Track_Id}
              style={{ flexDirection: 'row', margin: 20, alignItems: 'center' }}
            >
              <TouchableOpacity
                // onPress={() => playTrack(track)}
                //onPress={() => handlePlayPause(index, trackUrl)}
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
              <Text style={{marginLeft: 20}}>{item?.Tracks?.Track_Artist}</Text>
            </View>
          )
        }}

      />
    )
  };



  return (
    <View style={{ margin: SIZES.padding * 2 }}>
      {renderContent()}

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
      <TouchableOpacity
        style={{
          alignSelf: 'center'
        }}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text>Dashboard</Text>
      </TouchableOpacity>

      {renderTrackList()}

      {/* {trackData.map((track) => console.log(track?.Tracks?.Track_Id))} */}
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({

})


