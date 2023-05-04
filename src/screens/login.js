import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, CustomText, TextButton } from '../custom/component';
import { SIZES, COLORS } from '../constants/theme';
import icons from '../constants/icons';
import { API, loginUrl } from '../api/apiServers';
import { setEmail } from '../redux/userSlice';
import { useDispatch } from 'react-redux';


const Login = ({ navigation }) => {
  // console.log('render Login');
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  //const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //  console.log(loginData.email)

  const dispatch = useDispatch();
  // handle login data change
  const handleOnChange = (text, loginData) => {
    setLoginData(prevState => ({ ...prevState, [loginData]: text }));
    setErrors(prevState => ({ ...prevState, [loginData]: null }));
  };

  // Error Messages
  const handleError = (errorMessage, loginData) => {
    setErrors(prevState => ({ ...prevState, [loginData]: errorMessage }));
  }


  // USER LOGIN !!
  const loginUser = () => {
    API({
      method: 'POST',
      url: `${loginUrl}`,
      params: {
        Email: loginData.email,
        Password: loginData.password
      },
      onSuccess: async (res) => {
        console.log('Login response: ', res)
        if (res[0].Status === "0") {
          // Store Userid in local storage
          //await AsyncStorage.setItem('Userid', res[0].Userid);
          await AsyncStorage.setItem('Userid', JSON.stringify(true));
          // Set email in Redux store
          dispatch(setEmail(loginData.email));
          // Navigate to Dashboard
          navigation.navigate('Dashboard', { userId: res[0].Userid })
          //navigation.navigate('Dashboard',  { isLoggedIn: true })
          // console.log(res[0].Userid);
        } else {
          //showAlert('This is an alert message.');
          alert('Invalid user and Password')
        }
      },
      onError: (err) => {
        console.log(err)
      }
    })
  };


  // USER LOGIN 
  const handleSubmit = () => {
    // on click of submit button
    // console.log('button click');
    let isValid = true;
    const fields = [
      { name: 'email', error: 'Please Enter Email' },
      { name: 'password', error: 'Please Enter Password' }
    ];
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    fields.map((field) => {
      if (!loginData[field.name]) {
        handleError(field.error, field.name);
        isValid = false;
      } else if (field.name === 'email' && !emailRegex.test(loginData[field.name])) {
        handleError('Please Enter Valid Email', field.name);
        isValid = false;
      } else {
        setErrors(prevState => ({ ...prevState, [field.name]: null }));
      }
    })
    if (isValid) {
      loginUser()
      setLoginData({
        email: "",
        password: ""
      })
    }
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
        <View style={styles.loginContainer}>
          <View>
            <Text style={styles.userLogin}>User Login</Text>
          </View>
          <Input
            placeholder='Enter Email'
            value={loginData.email}
            onChangeText={text => handleOnChange(text, 'email')}
            error={errors.email}
            // onFocus={() => handleError(null, 'email')}
            onFocus={() => setErrors(prevState => ({ ...prevState, email: null }))}
          />
          <Input
            value={loginData.password}
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
                onValueChange={(newValue) => console.log(newValue)}
              />
              <CustomText label={'Remember'} />

              {showToast && (
                <Toast
                  toastMessage='Please accept terms and condition'
                />
              )}
            </View>


            <CustomText
              label={'Forgot Password?'}
              onPress={() => navigation.navigate('Forgot')}
            />
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
      </ImageBackground>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

  container: {
    flex: 1,
    //backgroundColor: 'rgba(39,139,138,1)'
  },
  loginContainer: {
    margin: SIZES.padding * 2,
    //marginTop: 20,
    //height: SIZES.height / 1.8,
    borderRadius: 10,
    backgroundColor: COLORS.light,
    padding: SIZES.padding * 2.5
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