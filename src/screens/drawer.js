import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { updateTitle } from '../redux/reducers';
import { updateTitle, updateData, updateTopSongs } from '../redux/action';
import { useGetTopReleasesQuery, useGetTopSongsQuery } from '../redux/DrawerApiCall';
import { SIZES, COLORS, TEXTS } from '../constants/theme';
import icons from '../constants/icons';
import { selectEmail } from '../redux/userSlice';
import { ThemeContext } from '../utils/theme-context';




const Drawer = ({ navigation, route, ...props }) => {
  console.log('render Drawer');
  // console.log('data =>', isSuccess);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  
  const [showDrawerItems, setShowDrawerItems] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('')
  const { data: topReleasesData } = useGetTopReleasesQuery();
  const { data: topSongsData } = useGetTopSongsQuery();

  // const email = useSelector(selectEmail);

  //  console.log('email=>>', email);

  const dispatch = useDispatch();


  useEffect(() => {
    checkLoginStatus();
    getUserEmail()
  }, []);

  const checkLoginStatus = async () => {
    const userId = await AsyncStorage.getItem('Userid');
    setIsLoggedIn(!!userId);
  };

  const getUserEmail = async () => {
    const userId = await AsyncStorage.getItem('Userid');
    setEmail(userId.replace(/"/g, ''));
    // setEmail(userId.slice(1, -1));
  }


  // SHOWING HISTORY WHEN USER LOGIN
  const handleHistoryPress = () => {
    console.log('History pressed');
    if (isLoggedIn) {
      Alert.alert('You are logined user')
    } else {
      navigation.navigate('Login')
    }
  };

  const handleSongsPress = () => {
    if (isLoggedIn) {
      //Alert.alert('You are logined user')
      // console.log('Top Songs Data:', topSongsData); 
      dispatch(updateTitle('Top Songs!'));
      dispatch(updateTopSongs(topSongsData));
      navigation.navigate('Dashboard');
      //console.log(topSongsData);
    } else {
      navigation.navigate('Login')
    }
    //console.log('song press');
  }

  const handleAlbumsPress = () => {
    if (isLoggedIn) {
      Alert.alert('You are logined user')
      dispatch(updateTitle('Top Albums!'));
    } else {
      navigation.navigate('Login')
    }

    //console.log('Album press');
  }

  const handleReleasePress = () => {
    //console.log('topReleasesData:', topReleasesData);

    dispatch(updateTitle('Music Releases!'))
    dispatch(updateData(topReleasesData));
    navigation.navigate('Dashboard')
    // dispatch(setActiveList('updateRelease'));
    //console.log('Release press');
  }

  const handleArtistPress = () => {
    dispatch(updateTitle('Top Artists'))
    navigation.navigate('Dashboard')
    // console.log(updateData(topReleasesData?.Data?.Release_PrimaryArtist));
    // console.log('Artist press');
  }


  const browserPressed = () => {
    setIsExpanded(!isExpanded);
  };

  const libraryPressed = () => {
    setShowDrawerItems(!showDrawerItems);
  };

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      style={{ height: SIZES.height, flex: 1 }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >

      <View>
        {/* Header */}
        <View style={[styles.container, { marginHorizontal: SIZES.padding * 2 }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

            }}>
            <Image
              source={icons.wallet}
              style={{ width: 30, height: 30, tintColor: COLORS.primary, marginRight: 15 }}
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: COLORS.support1,
                // fontFamily: 'Poppins-Bold'
              }}>DOMPET</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.closeDrawer()}>
            <Image
              source={icons.menu}
              style={{
                width: 24,
                height: 24,
                tintColor: COLORS.primary
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Profile Details */}
        <View
          style={{
            marginHorizontal: SIZES.padding * 2,
            marginVertical: SIZES.padding * 3,
            borderWidth: 0.2,
            borderColor: 'rgba(200,200,200,1)',
            borderRadius: 15,
            padding: SIZES.padding * 1.3,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.light
          }}
        >
          <Image
            source={icons.profile}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 15
            }}
          />
          <View>
            <Text style={styles.profile_name}>smaith</Text>
            {isLoggedIn && <Text style={{ fontWeight: '600' }}>{email}</Text>}
          </View>
        </View>

        {/* Drawer Selection Items */}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={browserPressed}
          style={styles.browserBtn}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: COLORS.light
            }}
          >BROWSER
          </Text>
          <Image
            source={icons.downarrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.light,
              transform: [{ rotate: isExpanded ? '0deg' : '-90deg' }]
            }}
          />
        </TouchableOpacity>

        {/* Drawer items */}
        {/* <DrawerItemList {...props} /> */}
        {isExpanded && (
          <View style={{ backgroundColor: 'white', width: '100%' }}>
            <DrawerItem
              label='Top Release'
              labelStyle={{ marginLeft: -20, fontWeight: '500', fontSize: 15, color: 'black' }}
              onPress={handleReleasePress}
              icon={() => (
                <Image
                  source={icons.downarrow}
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: 'black',
                    transform: [{ rotate: '-90deg' }]
                  }}
                />
              )}
            />
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: 'rgba(190,191,203,1)',
                borderRadius: 100,
              }}
            />

            <DrawerItem
              label='Top Artists'
              labelStyle={{ marginLeft: -20, fontWeight: '500', fontSize: 15, color: 'black' }}
              onPress={handleArtistPress}
              icon={() => (
                <Image
                  source={icons.downarrow}
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: 'black',
                    transform: [{ rotate: '-90deg' }]
                  }}
                />
              )}
            />
          </View>
        )}

        {/* LIBRARY */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={libraryPressed}
          style={styles.browserBtn}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: COLORS.light
            }}
          >LIBRARY
          </Text>
          <Image
            source={icons.downarrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.light,
              transform: [{ rotate: showDrawerItems ? '0deg' : '-90deg' }]
            }}
          />
        </TouchableOpacity>

        {/* Library items */}

        {showDrawerItems && (
          <View style={{ backgroundColor: 'white', width: '100%' }}>
            {/* HISTORY */}

            <DrawerItem
              label='History'
              labelStyle={{ marginLeft: -20, fontWeight: '500', fontSize: 15, color: 'black' }}
              onPress={handleHistoryPress}
              icon={() => (
                <Image
                  source={icons.downarrow}
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: 'black',
                    transform: [{ rotate: '-90deg' }]
                  }}
                />
              )}
            />

            <View
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(190,191,203,1)',
                // borderRadius: 100,
              }}
            />

           
            {/* SONGS */}

            <DrawerItem
              label='Songs'
              labelStyle={{ marginLeft: -20, fontWeight: '500', fontSize: 15, color: 'black' }}
              onPress={handleSongsPress}
              icon={() => (
                <Image
                  source={icons.downarrow}
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: 'black',
                    transform: [{ rotate: '-90deg' }]
                  }}
                />
              )}
            />

            <View
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(190,191,203,1)',
                borderRadius: 100,
              }}
            />
          
            {/* ALBUMS */}

            <DrawerItem
              label='Albums'
              labelStyle={{ marginLeft: -20, fontWeight: '500', fontSize: 15, color: 'black' }}
              onPress={handleAlbumsPress}
              icon={() => (
                <Image
                  source={icons.downarrow}
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: 'black',
                    transform: [{ rotate: '-90deg' }]
                  }}
                />
              )}
            />

            <View
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(190,191,203,1)',
                borderRadius: 100,
              }}
            />
           
          </View>
        )}
      </View>

      <TouchableOpacity
        //onPress={() => navigation.navigate('Home')}
        style={{
          margin: SIZES.padding,
          backgroundColor: 'rgba(17,52,85,1)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: SIZES.padding * 1.5,
          borderRadius: 10,
          flexDirection: 'row'
        }}
      >
        <Image
          source={icons.plus}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.light
          }}
        />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 18,
            fontWeight: '600',
            color: COLORS.light
          }}
        > NEW PLAYLIST</Text>
      </TouchableOpacity>

    </DrawerContentScrollView>
  )
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    profile_name: {
      fontSize: 15,
      fontWeight: TEXTS.text.weight.bold,
      lineHeight: 30,
      color: COLORS.support1
    },
    browserBtn: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SIZES.padding,
      width: '100%',
      height: 40,
      backgroundColor: theme.primary
    }
  })



export default Drawer