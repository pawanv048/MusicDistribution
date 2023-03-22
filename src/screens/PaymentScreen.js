
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
  const [currentIndex, setCurrentIndex] = useState(null)

  console.log('index =>',currentIndex);

  // playing testing
  // const trackUrl = trackData.map((trackList) => {
  //   const trackId = trackList?.Tracks?.Track_Id;
  //   const trackUrl = `${trackList?.Tracks?.Track_RootUrl}${trackList?.Tracks?.Track_AudioFile}`;
  //   //console.log(`Track ID: ${trackId}, Track URL: ${trackUrl}`);
  //   return { [trackId]: trackUrl };
  // });

  // demo testing
  const tracks = trackData.map((trackList) => {
    const currentTrack = trackList?.Tracks;
    return {
      id: String(currentTrack.Track_Id),
      url: currentTrack.Track_RootUrl + currentTrack.Track_AudioFile,
      title: currentTrack.Track_Title,
      artist: currentTrack.Track_Artist,
      // artwork: currentTrack.Track_ArtworkUrl, // replace with artwork url if available
      album: '',
      genre: currentTrack.Track_SubGenre,
      date: currentTrack.Track_Date,
      artwork: '', // add artwork url if available
      duration: 0
    };
  });

  const handleTogglePlay = (index) => {
    const selectedTrack = tracks[index];
    //console.log('selectedTrack =>', selectedTrack);
    if (isPlaying && currentIndex === index) {
      console.log('url =>',selectedTrack.url)
      
      pauseTrack(selectedTrack.url);
      setIsPlaying(false);
      setCurrentIndex(null);
    } else {
      if (currentIndex != null) {
        const prevTrack = tracks[currentIndex];
        pauseTrack(prevTrack.url);
      }
      playTrack(selectedTrack.url);
      setIsPlaying(true);
      setCurrentIndex(index);
    }
  };

  // end

  // console.log(tracks)

  const handleTogglePlayhh = (index) => {
    // const currentTrack = trackUrl[index];
    // const trackId = Object.keys(currentTrack)[0];
    // const trackUrl = currentTrack[trackId];
    // console.log(`Button ${index} was clicked with track ID: ${trackId} and track URL: ${trackUrl}`);
    setCurrentIndex(index);
    setIsPlaying((prevState) => !prevState);
    Alert.alert(`Button ${index} was clicked`);
  };



  const handlePlayPause = (index, trackUrls) => {
    const selectedTrackUrl = trackUrls[index];
    if (isPlaying == true && currentIndex == index) {
      // pause the currently playing track
      pauseTrack(selectedTrackUrl);
      setIsPlaying(false);
      setCurrentIndex(null);
      // normal rate play
      // handleDefaultPlaybackRate()
    } else {
      // pause the previously playing track (if any)
      if (currentIndex != null) {
        const prevTrackUrl = trackUrls[currentIndex];
        pauseTrack(prevTrackUrl);
      }
      // play the selected track
      playTrack(selectedTrackUrl);
      setIsPlaying(true);
      setCurrentIndex(index);
    }
  }


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
  };

  const renderContent = () => {

    // const renderTrackList = ({item}) => {
    //   return(
    //     <Text>{item?.Tracks?.Track_Disc}</Text>
    //   )
    // }

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
              style={{ flexDirection: 'row', margin: 20 }}
            >
              <Text>{item?.Tracks?.Track_Artist}</Text>
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
                  height: 20
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


