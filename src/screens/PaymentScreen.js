
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import {
  CardField,
  useStripe,
  createToken,
  paymentIndent,
  confirmPayment
} from '@stripe/stripe-react-native';

import { TextButton } from '../custom/component';
import { API, createPaymentIntent } from '../api/stripeApis';
import { COLORS, SIZES } from '../constants/theme';
import { useDetailData } from '../context/useDetailData';



const image = 'https://cdn.pixabay.com/photo/2016/11/18/18/35/adult-1836322_960_720.jpg'

const PaymentScreen = ({ navigation, route }) => {

  // const releaseDatas = route.params
  const { item } = route.params;
  const releaseId = item?.Release_Id;


  //  console.log(releaseId);
  // alert(JSON.stringify(item))

  const [cardInfo, setCardInfo] = useState(null);
  const [trackData, setTrackData] = useState([])

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
    getAllTrack();
    // console.log(releaseId);
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
        <Image
          source={{ uri: `https://musicdistributionsystem.com/release/${item.Release_Artwork}` }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 15
          }}
        />
        <View
          style={{
            margin: SIZES.padding
          }}>
          <Text style={{
            marginBottom: 10,
            fontSize: 20,
            fontWeight: '500'
          }}>{item.Release_ReleaseTitle}</Text>
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
        renderItem={({ item, index }) => {
          return (
            <View>
              <Text>{item?.Tracks?.Track_Id}</Text>
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


