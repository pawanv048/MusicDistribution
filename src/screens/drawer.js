import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { SIZES, COLORS } from '../constants/theme';
import { TextButton } from '../custom/component';



const wallet_img = 'https://cdn-icons-png.flaticon.com/512/2169/2169854.png';
const menu = 'https://cdn-icons-png.flaticon.com/512/7231/7231133.png';
const profile = 'https://cdn.pixabay.com/photo/2021/01/21/16/44/model-5937809_960_720.jpg';
const down_arrow = 'https://cdn-icons-png.flaticon.com/512/32/32195.png';
const plus = 'https://cdn-icons-png.flaticon.com/512/1828/1828919.png';
const download = 'https://cdn-icons-png.flaticon.com/512/2382/2382067.png';


const drawerItems = [
  { label: 'New Release', onPress: () => console.log('Home') },
  { label: 'Top Charts', onPress: () => console.log('Profile pressed') },
  { label: 'Top Playlist', onPress: () => console.log('Settings pressed') },
  { label: 'Podcasts', onPress: () => console.log('Settings pressed') },
  { label: 'Top Artists', onPress: () => console.log('Settings pressed') },
  { label: 'Radio', onPress: () => console.log('Settings pressed') },
];

const libraryItems = [
  { label: 'History', onPress: () => console.log('Home pressed') },
  { label: 'Songs', onPress: () => console.log('Profile pressed') },
  { label: 'Albums', onPress: () => console.log('Settings pressed') },
  { label: 'Podcasts', onPress: () => console.log('Settings pressed') },
  { label: 'Artists', onPress: () => console.log('Settings pressed') },

];

const Drawer = ({ navigation }) => {

  const [showDrawerItems, setShowDrawerItems] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // const toggleDrawerItems = () => {
  //   // setShowDrawerItems(!showDrawerItems);
  //   // setIsExpanded(!isExpanded);
  //   Animated.timing(animation, {
  //     toValue: isExpanded ? 40 : showDrawerItems ? 40 : 4 + drawerItems.length * 50,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start();
  // };

  const browserPressed = () => {
    setIsExpanded(!isExpanded);
    //toggleDrawerItems()
  };

  const libraryPressed = () => {
    setShowDrawerItems(!showDrawerItems);
    //toggleDrawerItems()
    // code to handle button 2 press
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
              source={{ uri: wallet_img }}
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
            <Image source={{ uri: menu }}
              style={{ width: 20, height: 20 }}
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
            source={{ uri: profile }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 15
            }}
          />
          <View>
            <Text style={styles.profile_name}>HI, WILLIAM</Text>
            <Text style={{fontWeight: '600'}}>william@gmail.com</Text>
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
            source={{ uri: down_arrow }}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.light,
              transform: [{ rotate: isExpanded ? '0deg' : '-90deg' }]
            }}
          />
        </TouchableOpacity>

        {/* Drawer items */}

        {isExpanded && (
          <View>
            {drawerItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.grey20,
                  padding: SIZES.padding * 1.5,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.grey60,
                }}
              >
                <Image
                  source={{ uri: down_arrow }}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'black',
                    transform: [{ rotate: '-90deg' }]
                  }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: '500'
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
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
            source={{ uri: down_arrow }}
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
          <View>
            {libraryItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.grey20,
                  padding: SIZES.padding * 1.5,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.grey60,
                }}
              >
                <Image
                  source={{ uri: down_arrow }}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'black',
                    transform: [{ rotate: '-90deg' }]
                  }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: '500'
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
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
          source={{ uri: plus }}
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


export default Drawer

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profile_name: {
    fontSize: 15,
    fontWeight: 'bold',
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
    backgroundColor: COLORS.primary
  }
})