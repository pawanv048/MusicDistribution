import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useSelector } from 'react-redux';
import { useGetTopReleasesQuery } from '../redux/DrawerApiCall';
import { SearchComponent, TextButton, CustomText, Separator, CustomLoader } from '../custom/component';
import { COLORS, SIZES } from '../constants/theme';
import * as String from '../constants/strings';
import { artists, devotionals, originalArtists, tems } from '../constants/strings';
import { API, API_ALLRELEASE, releaseUrl } from '../api/apiServers';
import icons from '../constants/icons';


const songs = [
  {
    title: 'Avaritia',
    artist: 'deadmau5',
    artwork: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
    url: require('../../tracks/blues.wav'),
    id: '1',
    duration: '311'
  },
  {
    title: 'Raksha',
    artist: 'Himesh',
    artwork: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
    url: require('../../tracks/tracks_country.mp3'),
    id: '2',
    duration: '211'
  }
];

const playbackData = [
  { label: '0.25x', onPress: () => console.log('0.25'), rate: 0.25 },
  { label: '0.5x', onPress: () => console.log('0.5'), rate: 0.5 },
  { label: '0.75x', onPress: () => console.log('0.75'), rate: 0.75 },
  { label: 'Normal', onPress: () => console.log('Normal'), rate: 1.0 },
  { label: '1.25x', onPress: () => console.log('1.25'), rate: 1.25 },
  { label: '1.5x', onPress: () => console.log('1.5'), rate: 1.5 },
  { label: '1.75x', onPress: () => console.log('1.75'), rate: 1.75 },
  { label: '2x', onPress: () => console.log('2'), rate: 2.0 },
];


// Main screen
const Dashboard = ({navigation}) => {

  console.log('render Dashboard')


  // console.log(topReleasesData);


  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const [range, setRange] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [pbspeedVisible, setPbSpeedVisible] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isImageAvail, setImageAvail] = useState(null)
  const [imageSource, setImageSource] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  //Redux - get
  const titles = useSelector(state => state.dashboard.title)
  const topRelease = useSelector(state => state?.dashboard?.data?.Data)
  const [topReleaseList, setTopReleaseList] = useState([]);
  
  // console.log('topReleaseList=>>', topReleaseList);
 

  //modal
  const togglePlayBack = () => {
    if (pbspeedVisible) {
      setPbSpeedVisible(false);
      setModalVisible(true);
    } else {
      setPbSpeedVisible(true);
      setModalVisible(false);
    }
  }

  // showing download and playback speed modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setPbSpeedVisible(false);
  };

  // volume
  const handleVolToggle = () => {
    if (volume === 0) {
      TrackPlayer.setVolume(1); // set volume to max
      setVolume(1);
    } else {
      TrackPlayer.setVolume(0); // mute volume
      setVolume(0);
    }
  }



  // Default playback rate
  const handleDefaultPlaybackRate = async () => {
    await TrackPlayer.setRate(1.0);
    setPlaybackRate(1.0);
  }

  // Change playback rate
  const handleChangePlaybackRate = async (rate) => {
    await TrackPlayer.setRate(rate);
    setPlaybackRate(rate);
  }

  // POSITION OF SLIDER
  const sliderValue = duration ? position / duration : 0;

  const handleSliderChange = async (value) => {
    const newPosition = value * duration;
    await TrackPlayer.seekTo(newPosition);
    setPosition(newPosition);
    // newPosition is 0 sliderValue is 0
    // setSliderValue(value);
  };

  const updatePosition = async () => {
    const newPosition = await TrackPlayer.getPosition();
    setPosition(newPosition);
  };

  const updateDuration = async () => {
    const newDuration = await TrackPlayer.getDuration();
    setDuration(newDuration);
  };

  // user login 
  const retrieveLogin = async () => {
    try {
      const logindata = await AsyncStorage.getItem('Userid')
      //console.log('log data =>', logindata);
      setIsLoggedIn(logindata)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (topRelease) {
      setTopReleaseList(topRelease);
    }
  }, [topRelease]);

  useEffect(() => {
    retrieveLogin()
  }, []);

  // slider position update 

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     updatePosition();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);


// slider duration update
  // useEffect(() => {
  //   updateDuration();
  // }, [isPlaying]);


  //end
// play and pause 

  // useEffect(() => {
  //   const setupPlayerAsync = async () => {
  //     try {
  //       // set up the player if it is not set up yet

  //       //await TrackPlayer.setupPlayer();
  //       TrackPlayer.updateOptions({
  //         capabilities: [Capability.Play, Capability.Pause]
  //       });

  //       await TrackPlayer.add(songs)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   setupPlayerAsync();
  // }, [])

  // handle play and pause

  const handlePlayPause = async () => {
    console.log();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null && isPlaying == true) {
      TrackPlayer.pause();
      setIsPlaying(false);
      handleDefaultPlaybackRate()
    } else {
      TrackPlayer.play();
      setIsPlaying(true);
    }
  }

  // console.log('topRelease =>>', topRelease)

  // SEARCHING..

  // const handleSearch = (searchQuery) => {
  //   if (searchQuery == '') {
  //     setFilteredData(data);
  //   } else {
  //     const filteredData = data?.filter((item) => {
  //       const text = searchQuery.toUpperCase();
  //       const itemData = item.Release_ReleaseTitle.toUpperCase();
  //       return itemData.indexOf(text) > -1;
  //     });
  //     setFilteredData(filteredData);
  //   }
  // }


  // const handleSearch = (searchQuery) => {
  //   if (!searchQuery) {
  //     setTopRelease(useSelector(state => state?.dashboard?.data?.Data) || []);
  //   } else {
  //     const text = searchQuery.trim().toLowerCase();
  //     const topReleasefilteredData = topRelease?.filter((item) => {
  //       const itemData = item.Release_ReleaseTitle.toLowerCase() ?? '';
  //       return itemData.toLowerCase().includes(text);
  //     });
  //     setTopRelease(topReleasefilteredData);
  //   }
  // }

  const handleSearch = (searchQuery) => {
    // console.log(searchQuery);
    if (!searchQuery) {
      setTopReleaseList(topRelease);
      // console.log(topRelease);
    } else {
      const text = searchQuery.trim().toLowerCase();
      const topReleaseList = topRelease?.filter((item) => {
        const itemData = item.Release_ReleaseTitle.toLowerCase() ?? '';
        return itemData.toLowerCase().includes(text);
        //console.log('itemdata=>>',itemData.toLowerCase().includes(text));
      });
      setTopReleaseList(topReleaseList);
      //console.log(filterData);
    }
  };


  // const printUrl = `${API_ALLRELEASE_URL}${userId}`
  // console.log('printUrl', printUrl);

  const getAllReleases = () => {
    //console.log('calling api')
    setLoading(true);
    API({
      url: `${API_ALLRELEASE}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

      onSuccess: val => {
        setData(val?.Data)
        setFilteredData(val?.Data);
        setLoading(false)
      },
      onError: error => {
        console.log('ERROR:', error);
        // Handle the error response from the server here.
        if (error.response) {
          // The server responded with a status code that is not in the range of 2xx
          console.log('Server error:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('No response from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error:', error.message);
        }
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    getAllReleases()
  }, [])

// Rendering List of Top Release, All Releases

  function renderCardView() {

    const renderCard = ({ item }) => {
      //  console.log(item);
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            //marginHorizontal: SIZES.padding,
            alignItems: 'center',
            width: SIZES.width - 100,
            height: SIZES.height / 2.7,
            marginVertical: SIZES.padding * 2,
            //backgroundColor: 'red',
            borderRadius: 10
          }}>
          <FastImage
            source={{
              uri: `${releaseUrl}${item.Release_Artwork}`,
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
              borderRadius: 10
            }}
          >
            {/* Release_ReleaseTitle */}
            <View
              style={{
                marginHorizontal: SIZES.padding * 2,
                marginVertical: SIZES.padding * 1.5
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginBottom: 15
                }}
              >
                {item.Release_ReleaseTitle}
              </Text>
              {/* Release_PrimaryArtist */}
              <Text
                style={{
                  fontSize: 15,
                  lineHeight: 18,
                  fontWeight: '400'
                }}>
                {item.Release_PrimaryArtist}
              </Text>
            </View>
          </View>

          {/* BUY NOW */}
          {isLoggedIn && !titles && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Home', {
                Release_Id: item.Release_Id,
                Release_Artwork: item.Release_Artwork,
              }
              )}
              style={{
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: '#fff'
                }}>Buy Now</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )
    };


    return (
      <React.Fragment>
        <View style={styles.card}>
          <View style={{ margin: SIZES.padding * 2 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '900',
                marginBottom: SIZES.padding,
                color: 'rgb(17,52,85)'
              }}>
              {/* {title} */}
              {titles}
            </Text>
            {titles && (
              <View>
                <Separator
                  lineContainer={{
                    width: `${titles.length * 3}%`,
                    height: 5
                  }} />
                <Separator
                  lineContainer={{
                    width: `${titles.length * 2}%`,
                    height: 5,
                    marginTop: 5
                  }} />
              </View>
            )}
          </View>

          {/* EPISODES CARD */}

          {isLoading ? (
            <CustomLoader />
          ) : titles == 'Music Releases!' ? (
            <FlatList
              //data={topRelease}
              data={topReleaseList}
              keyExtractor={(item, index) => item + index}
              renderItem={renderCard}
              showsHorizontalScrollIndicator={false}
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: SIZES.padding * 3 }} />}
              contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3, marginBottom: SIZES.padding * 2 }}
            />
          ) : titles == 'Top Artists' ? (
            <FlatList
              data={topRelease}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => {
                //console.log('topRelease Item==>>',item); // print the Release_Id to the console
                return (
                  // render a component that displays the Release_Id
                  <View>
                    <Text>{item.Release_Id}</Text>
                  </View>
                );
              }}
            />
          ) : (
            <FlatList
              data={filteredData}
              renderItem={renderCard}
              keyExtractor={item => item.Release_Id.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: SIZES.padding * 3 }} />}
              contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3, marginBottom: SIZES.padding * 2 }}
            />
          )}

        </View>
      </React.Fragment>
    )
  };


  // FOOTER CONTENT

  const renderFooter = () => {

    return (
      <React.Fragment>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <View>
            <Text style={styles.footerTxt}>TOP ARTISTS</Text>
            {artists.map((artist, index) => (
              <Text key={index} style={styles.artistTxt}>{artist}</Text>
            ))}
          </View>

          <View>
            <Text style={styles.footerTxt}>TOP ACTORS</Text>
            {artists.map((artist, index) => (
              <Text key={index} style={styles.artistTxt}>{artist}</Text>
            ))}
          </View>
        </View>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.footerTxt}>DEVOTIONAL SONGS</Text>
              {devotionals.map((devotional, index) => (
                <Text key={index} style={styles.artistTxt}>{devotional}</Text>
              ))}
            </View>

            <View>
              <Text style={styles.footerTxt}>COMPANY</Text>
              {tems.map((company, index) => (
                <Text key={index} style={styles.artistTxt}>{company}</Text>
              ))}
            </View>
          </View>

          <View>
            <Text style={styles.footerTxt}>ARTISTS ORIGINALS</Text>
            {originalArtists.map((original, index) => (
              <Text key={index} style={styles.artistTxt}>{original}</Text>
            ))}
          </View>
        </View>

        <Separator
          lineContainer={{
            borderBottomWidth: 1,
            marginTop: SIZES.padding2,
            borderBottomColor: COLORS.support1
          }}
        />

        <View>
          <Text style={[styles.artistTxt, { textAlign: 'left' }]}>{String.rights}</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={[styles.artistTxt, { textAlign: 'left' }]}>{String.social}</Text>
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
      </React.Fragment>
    )
  };

  // MAIN VIEW

  return (
    <React.Fragment>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ margin: SIZES.padding * 2, paddingBottom: 100 }}
        bounces={false}
      >
        <SearchComponent
          onSearch={handleSearch}
        />
        <View style={styles.subContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row'
              }}>
              <Image
                source={icons.exit}
                style={{
                  tintColor: COLORS.support1,
                  marginRight: 5,
                  height: 15,
                  width: 15
                }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'rgba(17,52,85,1)',
                    marginRight: 15
                  }}>
                  {isLoggedIn ? 'LOG OUT' : 'LOG IN'}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row'
              }}>
              <Image
                source={icons.exit}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: COLORS.support1,
                  marginRight: 5
                }}
              />
              <CustomText
                label={'SIGN UP'}
                onPress={() => navigation.navigate('Register')}
              />
            </View>
          </View>
        </View>


        {renderCardView()}
        {renderFooter()}
      </ScrollView>

      {/* PLAY AND PAUSE PLAYER */}
      {/* <View
        style={{
          width: SIZES.width,
          height: SIZES.height / 5,
          backgroundColor: 'rgba(17,52,85,1)',
          position: 'absolute',
          bottom: 0,
          padding: SIZES.padding
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // margin: SIZES.padding
          }}>
          <Image
            source={{ uri: PIC }}
            style={{
              width: 50,
              height: 50,
              marginRight: 10,
              borderRadius: 8
            }}
          />
          <View>
            <Text
              style={{
                color: 'white',
                lineHeight: 30,
                fontSize: 20,
                fontWeight: '700'
              }}>Rakash roshan</Text>
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                fontWeight: '400'
              }}>Himesh Reshammiya</Text>
          </View>
        </View> */}

      {/* MUSIC PLAYER */}
      {/* <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: COLORS.light,
            marginTop: 10,
            borderRadius: 30,
            justifyContent: 'center',
            paddingHorizontal: SIZES.padding,
          }}
        > */}

      {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          > */}
      {/* <TouchableOpacity
              onPress={() => handlePlayPause()}
              style={{
                marginHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20
              }}>
              <Image
                source={isPlaying == true ? { uri: pause } : { uri: playbtn }}
                //source={{uri: playbtn}}
                style={{
                  height: 10,
                  width: 10,
                }}
              />
            </TouchableOpacity> */}
      {/* <Text>
              {`${Math.floor(position / 60)}:${Math.floor(position % 60)} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`}
            </Text> */}

      {/* <Slider
              style={{ width: 150, height: 40, marginHorizontal: 15 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="rgba(11,11,11,1)"
              maximumTrackTintColor="rgba(89,89,89,1)"
              value={sliderValue}
              // onValueChange={setSliderValue}
              onValueChange={handleSliderChange}
            /> */}

      {/* VOLUME BUTTON */}
      {/* <TouchableOpacity
              onPress={handleVolToggle}
            >
              <Image
                source={volume === 1 ? { uri: vol } : { uri: mute }}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 15
                }}
              />
            </TouchableOpacity>


            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={{ uri: menu }}
                style={{
                  width: 20,
                  height: 20
                }}
              />
            </TouchableOpacity> */}

      {/* download and playback speed */}
      {/* {modalVisible ? (
              <View
                style={styles.download}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10
                  }}>
                  <Image
                    source={{ uri: download }}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 10
                    }}
                  />
                  <Text style={{ fontSize: 15, fontWeight: '400' }}>Download</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={togglePlayBack}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Image
                    source={{ uri: playbackspeed }}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 6
                    }}
                  />
                  <Text style={{ fontSize: 15, fontWeight: '400' }}>Playback Speed</Text>
                </TouchableOpacity>
              </View>
            ) : null} */}

      {/* Playbackspeed */}
      {/* {pbspeedVisible && (
              <ScrollView
                style={[styles.download, { height: 200 }]}
                contentContainerStyle={{ paddingBottom: 25 }}
              >
                <TouchableOpacity
                  onPress={togglePlayBack}
                  style={{ flexDirection: 'row' }}
                >
                  <Image
                    source={{ uri: back }}
                    style={{
                      width: 15,
                      height: 15,
                      marginRight: 20
                    }}
                  />
                  <Text>Option</Text>
                </TouchableOpacity>

                {playbackData.map((item, index) => {

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleChangePlaybackRate(item.rate)}
                      style={{
                        marginHorizontal: 40,
                        marginVertical: 10
                      }}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            )} */}

      {/* </View> */}
      {/* </View> */}
      {/* </View> */}
    </React.Fragment>
  )
};

// const mapStateToProps = state => {
//   return {
//     title: state.dashboard.title
//   };
// };

//export default connect(mapStateToProps)(Dashboard);
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
    height: SIZES.height / 1.6,
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
  },
  download: {
    width: '60%',
    height: 100,
    backgroundColor: 'white',
    position: 'absolute',
    padding: 15,
    //borderRadius: 20,
    right: 10,
    bottom: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 8.65,
  }

})