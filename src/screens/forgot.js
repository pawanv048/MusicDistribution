import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import React from 'react';
import { SIZES, COLORS } from '../constants/theme';
import icons from '../constants/icons';
import { Input, TextButton } from '../custom/component';


const Forgot = ({ navigation }) => {
  console.log('render Forgot');
  const renderFogotPassword = () => {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding * 2,
        }}
      >
        <View
          style={styles.forgetView}>
          <Text
            style={styles.forget}
          >
            Forget Password
          </Text>

          {/* FORGET PASSWORD */}
          <Input
            placeholder='Enter Email'
          />
          <Input
            placeholder='New password'
          />
          <Input
            placeholder='confirm password'
          />

          {/* SAVE */}
          <TextButton
            onPress={() => navigation.navigate('Login')}
            label={'Save'}
            labelStyle={{
              fontSize: 18,
              lineHeight: 20,
              fontWeight: 'bold',
            }}
          />
        </View>
      </View>
    )
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={icons.body}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center"
        }}>
        {renderFogotPassword()}
      </ImageBackground>
    </View>
  )
}

export default Forgot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forget: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 30
  },
  forgetView: {
    width: '100%',
    height: SIZES.height / 2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: SIZES.padding * 2,
  }
})