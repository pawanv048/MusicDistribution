import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SIZES, COLORS } from '../constants/theme';
import { Input, CustomText, TextButton } from '../custom/component';
import CheckBox from '@react-native-community/checkbox';


const Login = ({ navigation }) => {

  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    userName: "",
    password: ""
  });

  // console.log(loginData)

  // handle login data change
  const handleOnChange = (text, loginData) => {
    setLoginData(prevState => ({ ...prevState, [loginData]: text }));
    setErrors(prevState => ({ ...prevState, [loginData]: null }));
  };

  // Error Messages
  const handleError = (errorMessage, loginData) => {
    setErrors(prevState => ({ ...prevState, [loginData]: errorMessage }));
  }

  const handleSubmit = () => {
    // on click of submit button
    // console.log('button click');
    let isValid = true;
    const fields = [
      { name: 'userName', error: 'Please Enter User Name' },
      { name: 'password', error: 'Please Enter Password' },
    ];

    fields.map((field) => {
      if (!loginData[field.name]) {
        handleError(field.error, field.name);
        isValid = false;
      }
    })
    if (isValid) {
      navigation.navigate('Dashboard')
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View>
          <Text style={styles.userLogin}>User Login</Text>
        </View>
        <Input
          placeholder='Enter UserName'
          value={loginData.userName}
          onChangeText={text => handleOnChange(text, 'userName')}
          error={errors.userName}
          // onFocus={() => handleError(null, 'userName')}
          onFocus={() => setErrors(prevState => ({ ...prevState, userName: null }))}
        />
        <Input
          placeholder='Enter Password'
          secureTextEntry
          onChangeText={text => handleOnChange(text, 'password')}
          error={errors.password}
          onFocus={() => handleError(null, 'password')}
        />

        {/* REMEMBER */}

        <View
          style={{
            marginTop: SIZES.padding * 3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: SIZES.padding * 2
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <CheckBox
              disabled={false}
              boxType="square"
              onFillColor='rgba(0,108,246,1)'
              onCheckColor='#fff'
              onTintColor='rgba(0,108,246,1)'
              value={toggleCheckBox}
              style={{
                width: 15,
                height: 15,
                //tintColor: COLORS.primary,
                marginRight: 10,
                borderWidth: 0.5
              }}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <CustomText label={'Remember'} />
          </View>

          <CustomText label={'Forgot Password?'} />
        </View>

        {/* SUBMIT */}
        <TextButton
          onPress={handleSubmit}
          label={'SUBMIT'}
          contentContainerStyle={{ marginBottom: SIZES.padding * 3 }}
          labelStyle={{
            fontSize: 18,
            lineHeight: 20,
            fontWeight: 'bold',
          }}
        />
        {/* NOT REGISTER */}
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '500'
            }}>Not Register?
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{
                fontWeight: '800',
                color: COLORS.primary
              }}> Create Account</Text>
          </Text>
        </View>
      </View>
          
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgba(39,139,138,1)'
  },
  loginContainer: {
    margin: SIZES.padding * 2,
    marginTop: 130,
    //height: SIZES.height / 1.8,
    borderRadius: 10,
    backgroundColor: COLORS.light,
    padding: SIZES.padding * 3
  },
  userLogin: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 35,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 30
  },
  btn: {
    backgroundColor: '#ff0044',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 160,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
})