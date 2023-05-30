import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import TrackPlayer, { useProgress } from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import * as Progress from 'react-native-progress';
import RNFS from 'react-native-fs';
// import {  } from 'react-native-audio-toolkit';
// import { AudioCon } from '@react-native-community/audio-toolkit';
import LottieView from "lottie-react-native";
import { SearchComponent, CustomText, Separator, CustomLoader, FooterDetails, SocialIcons } from '../custom/component';
import { COLORS, SIZES, TEXTS } from '../constants/theme';
import * as String from '../constants/strings';
import { API, API_ALLRELEASE, releaseUrl, url } from '../api/apiServers';
import icons from '../constants/icons';
import { playTrack, pauseTrack, getTrackInfo } from '../custom/AudioPlayer';
import { handleSearch } from '../utils/helpers';
import { ThemeContext } from '../utils/theme-context';
import Screen from '../custom/Screen';




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

const playbtn = 'https://cdn-icons-png.flaticon.com/512/727/727245.png'
const pause = 'https://cdn-icons-png.flaticon.com/512/1214/1214679.png'

// Main screen
const Dashboard = ({ navigation }) => {

  // console.log('render Dashboard')

  // console.log(topReleasesData);

  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);


  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  // console.log('filteredData:', filteredData);
  const [range, setRange] = useState(0)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false)
  const [position, setPosition] = useState(0);
  // console.log('position:', position);
  const [duration, setDuration] = useState(0);
  // console.log('duration:', duration);
  const [volume, setVolume] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [pbspeedVisible, setPbSpeedVisible] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isImageAvail, setImageAvail] = useState(null)
  const [imageSource, setImageSource] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [progress, setProgress] = useState(0);

  //Redux - get
  const titles = useSelector(state => state.dashboard.title)
  const topRelease = useSelector(state => state?.dashboard?.data?.Data)
  const topSongsData = useSelector((state) => state?.dashboard?.topSongs?.data);
  // console.log(topSongsData)
  const [topReleaseList, setTopReleaseList] = useState([]);
  const [topSongsList, setTopSongsList] = useState([])
  const [topArtistList, setTopArtistList] = useState([])


  // console.log('topSongsData=>>', topSongsData);

  // console.log('progress', progres);
  //modal
  // animation
  const removeAnimation = React.useRef(null);
  const onRemovePress = () => {
    removeAnimation?.current.play();
  };


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



  const handleSliderChange = async (value) => {
    const newPosition = value * duration;
    await TrackPlayer.seekTo(newPosition);
    setPosition(newPosition);
    // newPosition is 0 sliderValue is 0
    // setSliderValue(value);
  };

  useEffect(() => {
    // console.log('interval:', interval)
    const interval = setInterval(() => {
      updatePosition();
      updateDuration();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, sliderValue]);



  // POSITION OF SLIDER
  const progres = useProgress();
  // const {position, duration} = progres
  const sliderValue = duration ? position / duration : 0;
  // const sliderValue = duration ? position / duration : 0;
  // console.log('sliderValue:', sliderValue);

  // slider duration update
  // useEffect(() => {

  // }, [isPlaying]);

  const updatePosition = async () => {
    const newPosition = await TrackPlayer.getPosition();
    setPosition(newPosition);
    // console.log('newPosition', newPosition)
  };

  const updateDuration = async () => {
    const newDuration = await TrackPlayer.getDuration();
    setDuration(newDuration);
    // console.log('newDuration', newDuration)
  };

  // user login 

  useEffect(() => {
    retrieveLogin()
  }, []);

  const retrieveLogin = async () => {
    try {
      const logindata = await AsyncStorage.getItem('Userid')
      //console.log('log data =>', logindata);
      setIsLoggedIn(logindata)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (filteredData) {
      setFilteredData(filteredData);
    }
  }, [filteredData]);

  useEffect(() => {
    if (topSongsData) {
      setTopSongsList(topSongsData);
    }
  }, [topSongsData]);

  useEffect(() => {
    if (topRelease) {
      setTopReleaseList(topRelease);
      setTopArtistList(topRelease);
    }
  }, [topRelease]);

  // slider position update 


  // handle play and pause

  const handlePlayPause = async (trackIndex, track) => {
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      console.log('Index:', trackIndex);
      console.log('Track ID:', track.Track_Id);

      if (
        currentTrack !== null &&
        currentTrackIndex === trackIndex &&
        isPlaying
      ) {
        const trackInfo = await getTrackInfo();
        if (trackInfo.trackObject.id === track.Track_Id) {
          pauseTrack(trackInfo.trackObject.id);
          setIsPlaying(false);
          console.log('Track paused:', track.Track_Title);
        }
      } else {
        if (currentTrackIndex !== trackIndex) {
          setCurrentTrackIndex(trackIndex);
          await TrackPlayer.reset();
          await TrackPlayer.add({
            id: track.Track_Id,
            title: track.Track_Title,
            artist: track.Track_Artist,
            url: track.url
          });
        }
        await TrackPlayer.play();
        setIsPlaying(true);
        console.log('Track played:', track.Track_Title);
      }
    } catch (error) {
      console.log('Error handling play/pause:', error);
    }
  };



  // console.log('topRelease =>>', topRelease)

  // SEARCHING..  

  const handleSearch = (searchQuery) => {
    if (!searchQuery) {
      setFilteredData(data);
      if (titles === 'Music Releases!') {
        setTopReleaseList(topRelease);
      } else if (titles === 'Top Artists') {
        setTopArtistList(topRelease);
      } else if (titles === 'Top Songs!' && isLoggedIn) {
        setTopSongsList(topSongsData);
      }
    } else {
      const firstLetter = searchQuery.trim()[0].toLowerCase();

      const dashfilter = filteredData.filter((item) => {
        const itemData = item.Release_ReleaseTitle.trim().toLowerCase() ?? '';
        if (itemData[0] === firstLetter) {
          return itemData.includes(searchQuery.trim().toLowerCase());
        }
        return false;
      }) ?? [];

      let topReleaseList = [];
      let topSongsList = [];
      let topArtistList = [];

      if (titles === 'Music Releases!') {
        topReleaseList = topRelease.filter((item) => {
          const itemData = item.Release_ReleaseTitle.trim().toLowerCase() ?? '';
          if (itemData[0] === firstLetter) {
            return itemData.includes(searchQuery.trim().toLowerCase());
          }
          return false;
        }) ?? [];
      } else if (titles === 'Top Artists') {
        topArtistList = topRelease.filter((item) => {
          const itemData = item.Release_PrimaryArtist.trim().toLowerCase() ?? '';
          if (itemData[0] === firstLetter) {
            return itemData.includes(searchQuery.trim().toLowerCase());
          }
          return false;
        }) ?? [];
      } else if (titles === 'Top Songs!' && isLoggedIn) {
        topSongsList = topSongsData.filter((item) => {
          const itemSongData = item.Track_Artist.trim().toLowerCase() ?? '';
          if (itemSongData[0] === firstLetter) {
            return itemSongData.includes(searchQuery.trim().toLowerCase());
          }
          return false;
        }) ?? [];
      }

      const filteredDataWithIndex = dashfilter.map((item) => {
        const index = data.findIndex((el) => el.id === item.id);
        return { ...item, index };
      }) ?? [];

      const topReleaseListWithIndex = topReleaseList.map((item) => {
        const index = topRelease.findIndex((el) => el.id === item.id);
        return { ...item, index };
      }) ?? [];

      const topSongsListWithIndex = topSongsList.map((item) => {
        const index = topSongsData.findIndex((el) => el.id === item.id);
        return { ...item, index };
      }) ?? [];

      const topArtistListWithIndex = topArtistList.map((item) => {
        const index = topRelease.findIndex((el) => el.id === item.id);
        return { ...item, index };
      });

      if (
        filteredDataWithIndex.length > 0 ||
        topReleaseListWithIndex.length > 0 ||
        topSongsListWithIndex.length > 0 ||
        topArtistListWithIndex.length > 0
      ) {
        setFilteredData(filteredDataWithIndex);
        if (titles === 'Music Releases!') {
          setTopReleaseList(topReleaseListWithIndex);
        } else if (titles === 'Top Artists') {
          setTopArtistList(topArtistListWithIndex);
        } else if (titles === 'Top Songs!' && isLoggedIn) {
          setTopSongsList(topSongsListWithIndex);
        }
      } else {
        alert(`No matching element found for '${searchQuery}'.`);
      }
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
      if (titles === 'Music Releases!') {
        return (
          <View
            style={{
              //marginHorizontal: SIZES.padding,
              alignItems: 'center',
              width: SIZES.width - 100,
              height: SIZES.height / 2.7,
              marginVertical: SIZES.padding * 2,
              //backgroundColor: 'red',
              borderRadius: 10,
              // shadowOffset: {width: 2, height: -2},
              // shadowColor: 'black',
              // shadowOpacity: 0.3,
              // shadowRadius: 4
            }}>
            <FastImage
              source={{
                uri: `${releaseUrl}${item.Release_Artwork}`,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
              accessibilityLabel="Please wait image is arraving"
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
                  margin: SIZES.padding * 2
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
          </View>
        )
      } else if (titles === 'Top Artists') {
        return (
          <View
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
              accessibilityLabel="Please wait image is arraving"
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
                {/* Release_PrimaryArtist */}
                <Text
                  style={{
                    fontSize: TEXTS.text.size.sm,
                    lineHeight: 18,
                    fontWeight: '400'
                  }}>
                  {item.Release_PrimaryArtist}
                </Text>
              </View>
            </View>
          </View>
        )
      }

      if (!titles) {
        return (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              //marginHorizontal: SIZES.padding,
              alignItems: 'center',
              width: SIZES.width - 100,
              height: SIZES.height / 2.7,
              marginVertical: SIZES.padding * 2,
              borderRadius: 10
            }}>
            <FastImage
              source={{
                uri: `${releaseUrl}${item.Release_Artwork}`,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
              accessibilityLabel="Please wait image is arraving"
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
                  margin: SIZES.padding * 2
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
      }


    };

    // const renderSongItems = ({item}) => {
    //   console.log('TopSongsitems =>>', item);
    // }


    return (
      <React.Fragment>
        <View style={styles.card}>

          {/* <TouchableOpacity onPress={() => navigation.navigate('Dummy')}>
            <Text onPress={() => WebBrowser.openBrowserAsync("https://pinballmap.com")}
            style={{alignSelf: 'center', paddingTop: 10}}>Dummy</Text>
          </TouchableOpacity> */}

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

          {/* RELEASES CARD */}

          {isLoading ? (
            // <CustomLoader />
            <LottieView
              source={require('../assets/loader-animation.json')}
              autoPlay loop
            />
          ) : titles == 'Music Releases!' ? (
            <FlatList
              // data={topRelease}
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
              data={topArtistList}
              keyExtractor={(item, index) => item + index}
              renderItem={renderCard}
              showsHorizontalScrollIndicator={false}
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: SIZES.padding * 3 }} />}
              contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3, marginBottom: SIZES.padding * 2 }}
            />
          ) : titles == 'Top Songs!' && isLoggedIn ? (
            // <Text>show top songs</Text>
            <FlatList
              data={topSongsList}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index }) => {
                // console.log('Item:', item);
                //const trackId = item.Track_Id.toString();
                return (
                  <View
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
                        uri: `https://cdn.pixabay.com/photo/2023/05/03/16/05/ai-generated-7968016_960_720.jpg`,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                      }}
                      accessibilityLabel="Please wait image is arraving"
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
                        padding: SIZES.padding * 1.5
                      }}
                    >
                      {/* Release_ReleaseTitle */}
                      <View
                        style={{
                          //backgroundColor: COLORS.lightGrey,
                          height: 40,
                          alignItems: 'center',
                          // paddingHorizontal: SIZES.padding,
                          borderRadius: 4,
                          //justifyContent: 'center',
                          flexDirection: 'row',
                          marginVertical: SIZES.padding
                        }}
                      >

                        <TouchableOpacity
                          onPress={() => handlePlayPause(index, {
                            Track_Id: item.Track_Id,
                            Track_Title: item.Track_Title,
                            Track_Artist: item.Track_Artist,
                            url: `https://musicdistributionsystem.com/tracks/${item.Track_AudioFile}`
                          })}
                          style={{
                            //marginHorizontal: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 20,
                            height: 20
                          }}>
                          <Image
                            //source={isPlaying == true && currentTrackId === item.Track_Id ? { uri: pause } : { uri: playbtn }}
                            source={isPlaying && currentTrackIndex === index && position < duration ? { uri: pause } : { uri: playbtn }}
                            //source={{uri: playbtn}}
                            style={{
                              height: 10,
                              width: 10,
                            }}
                          />
                        </TouchableOpacity>

                        {/* Position */}
                        <Text style={{ marginHorizontal: 5 }}>
                          {currentTrackIndex === index && position < duration
                            ? `${Math.floor(position / 60)}:${Math.floor(position % 60)}/${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`
                            : "0:0"}
                        </Text>


                        {/* Progress bar */}

                        <Progress.Bar
                          //progress={currentTrackIndex === index ? progress.position/progres.duration : 0}
                          progress={currentTrackIndex === index ? sliderValue : 0}
                          //progress={currentTrackIndex === index ? position / duration : 0}
                          width={120}
                          color='rgb(40,40,40)'
                          height={4}

                          style={{
                            borderRadius: 0,
                            backgroundColor: 'rgb(187,185,185)',
                            marginLeft: 0,
                            borderWidth: 0.2
                          }}
                        />

                        {/* <Text>{formatTime(progress.position)}</Text> */}
                        {/* <ProgressBar
                          progress={progress.position}
                          buffered={progress.buffered}
                        /> */}

                        {/* volume */}

                        <TouchableOpacity
                          onPress={handleVolToggle}
                        >
                          <Image
                            source={icons.vol}
                            style={{
                              width: 15,
                              height: 15,
                              marginHorizontal: SIZES.padding,
                              tintColor: currentTrackIndex === index && volume === 0 ? 'grey' : 'black'
                            }}
                          />
                        </TouchableOpacity>

                        {/* playback */}

                        <TouchableOpacity>
                          <Image
                            source={icons.more}
                            style={{
                              width: 20,
                              height: 20,
                            }}
                          />
                        </TouchableOpacity>
                      </View>


                      <View>
                        {/* Release_PrimaryArtist */}
                        <Text
                          style={{
                            fontSize: TEXTS.text.size.sm,
                            lineHeight: 18,
                            fontWeight: '400'
                          }}>
                          {item.Track_Artist}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              }}
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: SIZES.padding * 3 }} />}
              contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3, marginBottom: SIZES.padding * 2 }}
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
    const socialIcons = [
      { source: icons.facebook },
      { source: icons.google },
      { source: icons.linkdin },
      { source: icons.twitter },
    ];

    return (
      <React.Fragment>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <FooterDetails titleHeader="TOP ARTISTS" categoryData="artists" />
          <FooterDetails titleHeader="TOP ACTORS" categoryData="artists" />
        </View>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <FooterDetails titleHeader="DEVOTIONAL SONGS" categoryData="devotionals" />
            <FooterDetails titleHeader="COMPANY" categoryData="tems" />
          </View>
          <FooterDetails titleHeader="ARTISTS ORIGINALS" categoryData="originalArtists" />
        </View>

        <Separator lineContainer={{ borderBottomWidth: 1, marginTop: SIZES.padding2, borderBottomColor: COLORS.support1 }} />

        <View>
          <Text style={[styles.artistTxt, { textAlign: 'left' }]}>{String.rights}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.artistTxt, { textAlign: 'left' }]}>{String.social}</Text>

            {/* Social Icons */}
            {socialIcons.map((icon, index) => (
              <SocialIcons key={index} source={icon.source} />
            ))}
          </View>
        </View>
      </React.Fragment>
    )
  };

  // MAIN VIEW

  return (
    <React.Fragment>
      <Screen
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
      </Screen>
    </React.Fragment>
  )
};


const getStyles = (theme) =>
  StyleSheet.create({
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
        height: 2,
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


// const mapStateToProps = state => {
//   return {
//     title: state.dashboard.title
//   };
// };

//export default connect(mapStateToProps)(Dashboard);
export default Dashboard

