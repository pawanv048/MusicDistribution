import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';

import { SearchComponent, TextButton, CustomText, Separator } from '../custom/component';
import { COLORS, SIZES } from '../constants/theme';
import * as String from '../constants/strings';
import { API } from '../api/stripeApis';


const Data = [
  {
    id: 1,
    title: 'S02-E01 - Virat Kohli',
    desc: 'Catch the hottest punjab song with Guru Randhawa',
    img: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg'
  },
  {
    id: 2,
    title: 'S02-E01 - Virat Kohli',
    desc: 'Catch the hottest punjab song with Guru Randhawa',
    img: 'https://cdn.pixabay.com/photo/2018/03/30/17/25/women-3275942_960_720.png'
  },
  {
    id: 3,
    title: 'S02-E01 - Virat Kohli',
    desc: 'Catch the hottest punjab song with Guru Randhawa',
    img: 'https://cdn.pixabay.com/photo/2018/03/06/06/58/performance-3202707_960_720.jpg'
  },
  {
    id: 4,
    title: 'S02-E01 - Virat Kohli',
    desc: 'Catch the hottest punjab song with Guru Randhawa',
    img: 'https://cdn.pixabay.com/photo/2015/04/23/18/07/abstract-736439_960_720.jpg'
  }
]

const CategoryCardData = [
  {
    id: 1,
    name: 'Big Hits!',
    details: [
      {
        id: '1',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for S02-E01 - Virat Kohli',
        image: 'https://cdn.pixabay.com/photo/2017/08/02/13/00/lotte-2571479_960_720.jpg',
      },
      {
        id: '2',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 2',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
      {
        id: '3',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 3',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
    ],
  },
  {
    id: 2,
    name: 'Top Charts',
    details: [
      {
        id: '1',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 1',
        image: 'https://cdn.pixabay.com/photo/2016/11/18/18/35/adult-1836322_960_720.jpg',
      },
      {
        id: '2',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 2',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
      {
        id: '3',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 3',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
    ],
  },
  {
    id: 3,
    name: 'Popular albums',
    details: [
      {
        id: '1',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 1',
        image: 'https://cdn.pixabay.com/photo/2016/10/17/16/35/concert-1748102_960_720.jpg',
      },
      {
        id: '2',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 2',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
      {
        id: '3',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 3',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
    ],
  },

];

const facebook = 'https://cdn-icons-png.flaticon.com/512/1051/1051309.png';
const google = 'https://cdn-icons-png.flaticon.com/512/60/60818.png';
const linkdin = 'https://cdn-icons-png.flaticon.com/512/61/61109.png';
const twitter = 'https://cdn-icons-png.flaticon.com/512/25/25347.png';
const exit = 'https://cdn-icons-png.flaticon.com/512/8983/8983815.png';


const API_ALLRELEASE_URL = 'http://84.16.239.66/api/Release/GetAllReleases';

// Main screen
const Dashboard = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(Data);


  const handleSearch = (searchQuery) => {
    let newData = Data;
    if (searchQuery.trim() !== '') {
      newData = Data.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredData(newData);
  };

  const getAllReleases = () => {
    //console.log('calling api')
    API({
      url: `${API_ALLRELEASE_URL}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        setData(val?.Data)
        //console.log('Agreement data ==>', val?.Data)
        setLoading(false)
      },
      onError: val => console.log('ERROR:', val),
    });
    //setLoading(true);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  };

  useEffect(() => {
    // console.log('Use-Effect call')
    getAllReleases()
  }, [])


  function renderCardView() {

    const renderCard = ({ item }) => (

      <TouchableOpacity

        activeOpacity={0.7}
        style={{
          //marginHorizontal: SIZES.padding,
          alignItems: 'center',
          width: SIZES.width - 100,
          height: SIZES.height / 2.7,
          //backgroundColor: 'red',
          borderRadius: 10
        }}>
        <Image
          source={{ uri: item.img }}
          //source={item.Release_Artwork}
          style={{
            width: '100%',
            height: '65%',
            resizeMode: 'cover',
            borderRadius: 10
          }}
        />
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgba(243,243,243,1)',
            //height: 160,
            position: 'absolute',
            bottom: 0,
            borderRadius: 10
          }}
        >
          <View style={{ margin: SIZES.padding * 2 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 15
              }}
            >{item.title}</Text>
            <Text style={{
              fontSize: 15,
              lineHeight: 20,
              fontWeight: '400'
            }}>{item.desc}</Text>

            <TouchableOpacity
             // onPress={() => console.log('button pressed')}
              onPress={() => navigation.navigate('Home')}
              style={{
                marginVertical: 10,
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center',
                width: '40%',
                padding: 13,
                borderRadius: 5
              }}
            >
              <Text>Buy</Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableOpacity>
    );


    return (
      <>
        <View style={styles.card}>
          <View style={{ margin: SIZES.padding * 2 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: SIZES.padding
              }}>Best episodes of the week</Text>
            <Separator
              lineContainer={{
                width: '45%',
                height: 5
              }} />
            <Separator
              lineContainer={{
                width: '30%',
                height: 5,
                marginTop: 5
              }} />
          </View>

          {/* EPISODES CARD */}

          <FlatList
            data={filteredData}
            // data={data}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            // keyExtractor={item => item.Release_Id}
            showsHorizontalScrollIndicator={false}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: SIZES.padding * 3 }} />}
            contentContainerStyle={{ paddingHorizontal: SIZES.padding * 2, marginBottom: SIZES.padding * 2 }}
          // style={styles.card}
          />
        </View>
      </>
    )
  };

  // CATEGORIES CARD

  const renderCategoryView = () => {

    function renderItem({ item }) {

      const itemNameLength = item.name.length;

      return (

        <View
          style={{
            flex: 1,
            marginHorizontal: SIZES.padding * 2,
            marginTop: SIZES.padding * 3
          }}>
          <Text
            style={styles.categoryTitle}
          >{item.name}</Text>
          <Separator
            lineContainer={{
              width: `${(itemNameLength * 3)}%`,
              height: 5
            }} />
          <Separator
            lineContainer={{
              width: `${(itemNameLength * 2)}%`,
              height: 5,
              marginTop: 5
            }} />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
            horizontal
          >
            {item.details.map((detail) => (
              <TouchableOpacity
                key={detail.id}
                style={{
                  marginRight: SIZES.padding * 2,
                  //marginLeft: SIZES.padding * 0.5,
                  marginTop: SIZES.padding * 1.5,
                  alignItems: 'center',
                  width: SIZES.width - 100,
                  height: SIZES.height / 3,
                  //backgroundColor: 'red',
                  borderRadius: 10
                }}
              >
                <Image
                  source={{ uri: detail.image }}
                  style={{
                    width: '100%',
                    height: '65%',
                    resizeMode: 'cover',
                    borderRadius: 10
                  }}
                />
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(243,243,243,1)',
                    height: 120,
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: 10
                  }}
                >
                  <View style={{ margin: SIZES.padding * 2 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginBottom: 15
                      }}
                    >{detail.title}</Text>
                    <Text style={{
                      fontSize: 15,
                      lineHeight: 20,
                      fontWeight: '400'
                    }}>{detail.desc}</Text>
                  </View>
                </View>

              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      )
    }



    return (
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.30,
          shadowRadius: 8.0
        }}>
        <FlatList
          data={CategoryCardData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.card}
        //ItemSeparatorComponent={() => <View style={{ width: SIZES.padding * 2 }} />}
        //contentContainerStyle={{ paddingVertical: SIZES.padding * 3 }}
        />
      </View>
    )
  };

  // FOOTER CONTENT

  const renderFooter = () => {
    return (
      <>
        <View
          style={{
            //marginHorizontal: SIZES.padding,
            marginTop: 20,
            //alignItems: 'center'
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <View>
            <Text style={styles.footerTxt}>TOP ARTISTS</Text>
            <Text style={styles.artistTxt}>{String.neha}</Text>
            <Text style={styles.artistTxt}>{String.arjit}</Text>
            <Text style={styles.artistTxt}>{String.badh}</Text>
            <Text style={styles.artistTxt}>{String.atif}</Text>
            <Text style={styles.artistTxt}>{String.Justin}</Text>
            <Text style={styles.artistTxt}>{String.himesh}</Text>
            <Text style={styles.artistTxt}>{String.lata}</Text>
            <Text style={styles.artistTxt}>{String.diljit}</Text>
          </View>

          <View>
            <Text style={styles.footerTxt}>TOP ACTORS</Text>
            <Text style={styles.artistTxt}>{String.neha}</Text>
            <Text style={styles.artistTxt}>{String.arjit}</Text>
            <Text style={styles.artistTxt}>{String.badh}</Text>
            <Text style={styles.artistTxt}>{String.atif}</Text>
            <Text style={styles.artistTxt}>{String.Justin}</Text>
            <Text style={styles.artistTxt}>{String.himesh}</Text>
            <Text style={styles.artistTxt}>{String.lata}</Text>
            <Text style={styles.artistTxt}>{String.diljit}</Text>
          </View>
        </View>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.footerTxt}>DEVOTIONAL SONGS</Text>
              <Text style={styles.artistTxt}>{String.krishna}</Text>
              <Text style={styles.artistTxt}>{String.mantra}</Text>
              <Text style={styles.artistTxt}>{String.deva}</Text>
              <Text style={styles.artistTxt}>{String.hanuman}</Text>
              <Text style={styles.artistTxt}>{String.gayatri}</Text>
              <Text style={styles.artistTxt}>{String.mata}</Text>
              <Text style={styles.artistTxt}>{String.durga}</Text>
              <Text style={styles.artistTxt}>{String.maiya}</Text>
            </View>

            <View>
              <Text style={styles.footerTxt}>COMPANY</Text>
              <Text style={styles.artistTxt}>{String.about}</Text>
              <Text style={styles.artistTxt}>{String.culture}</Text>
              <Text style={styles.artistTxt}>{String.blog}</Text>
              <Text style={styles.artistTxt}>{String.jobs}</Text>
              <Text style={styles.artistTxt}>{String.press}</Text>
              <Text style={styles.artistTxt}>{String.advertise}</Text>
              <Text style={styles.artistTxt}>{String.terms}</Text>
              <Text style={styles.artistTxt}>{String.help}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.footerTxt}>ARTISTS ORIGINALS</Text>
            <Text style={styles.artistTxt}>{String.zaeden}</Text>
            <Text style={styles.artistTxt}>{String.raghav}</Text>
            <Text style={styles.artistTxt}>{String.SIXK}</Text>
            <Text style={styles.artistTxt}>{String.siri}</Text>
            <Text style={styles.artistTxt}>{String.lost}</Text>
          </View>
        </View>

        <Separator
          lineContainer={{
            borderBottomWidth: 1,
            marginTop: SIZES.padding2,
            borderBottomColor: COLORS.support1
          }} />

        <View>
          <Text style={[styles.artistTxt, { textAlign: 'left' }]}>{String.rights}</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={[styles.artistTxt, { textAlign: 'left' }]}>{String.social}</Text>
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
      </>
    )
  }



  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ margin: SIZES.padding * 2, paddingBottom: 100 }}
    >
      <SearchComponent
        onSearch={handleSearch}
      />
      <View style={styles.subContainer}>
        <TextButton
          // onPress={}
          label={'PREMIUM PLANS'}
        />
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row'
            }}>
            <Image source={{ uri: exit, height: 15, width: 15 }} style={{ tintColor: COLORS.support1, marginRight: 5 }} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text 
              style={{
                 fontSize: 15,
                 fontWeight: 'bold',
                 color: 'rgba(17,52,85,1)',
                  marginRight: 15
              }}>LOG IN</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row'
            }}>
            <Image source={{ uri: exit, height: 15, width: 15 }} style={{ tintColor: COLORS.support1, marginRight: 5 }} />
            <CustomText
              label={'SIGN IN'}
            />
          </View>
        </View>
      </View>

      {renderCardView()}
      {renderCategoryView()}
      {renderFooter()}
    </ScrollView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    backgroundColor: COLORS.light,
    //height: SIZES.height / 2, 
    marginTop: SIZES.padding * 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 8.65,
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SIZES.padding
  },
  footerTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.support1,
    marginVertical: SIZES.padding * 2
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
  }



})