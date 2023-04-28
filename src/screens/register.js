import { StyleSheet, Text, View, ScrollView, Linking, Alert, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Input, DropdownPicker, CustomText, TextButton, Toast } from '../custom/component';
import { baseUrl, API } from '../api/stripeApis';
import { SIZES, COLORS } from '../constants/theme';
import icons from '../constants/icons';


const Register = ({ navigation }) => {
  console.log('render Register');

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)
  const [errors, setErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [registerData, setregisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    cnfpassword: "",
  });

  //console.log('country',selectedCountry)

  const registerUser = async () => {
    API({
      method: 'POST',
      url: `http://84.16.239.66/Signup`,
      params: {
        FirstName: registerData.firstName,
        LastName: registerData.lastName,
        Email: registerData.email,
        Phone: registerData.phone,
        Password: registerData.password,
        CnfPassword: registerData.cnfpassword,
        // Country: registerData.country,
        // State: registerData.state
      },
      onSuccess: (data) => {
        console.log('Register response: ', data)
        if (data && data.length > 0 && data[0].Status === '2') {
          //onError(data[0].ErrorMessage);
          alert(data[0].ErrorMessage);
        } else {
          onSuccess(data);
          navigation.navigate('Login')
          setregisterData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            cnfpassword: "",
          });
          setToggleCheckBox(false);
        }
      },
      onError: (err) => {
        console.log('Error occurred while registering user:', err);
        onError('An unexpected error occurred');
      }
    })
  }

  



  const countryData = selectedCountry.map(item => {
    return { key: item.Country_Id, value: item.Country_Name };
  })
  //  console.log('newcountry',countryData);

  // handle login data change
  const handleOnChange = (text, registerData) => {
    setregisterData(prevState => ({ ...prevState, [registerData]: text })); // updater function style
    setErrors(prevState => ({ ...prevState, [registerData]: null })); // ufs - nothing but store the previous value.
  };
  // Error Messages
  const handleError = (errorMessage, registerData) => {
    setErrors(prevState => ({ ...prevState, [registerData]: errorMessage }));
  }

  // const handleCountrySelect = (selected) => {
  //   setregisterData({ ...registerData, country: selected });
  //   // console.log(selected);
  // }

  // const handleStateSelect = (selected) => {
  //   setregisterData({ ...registerData, state: selected });
  //   // console.log(selected);
  // }


  // USER REGISTER !!
  const handleSubmit = () => {
    // on click of submit button
    // console.log('button click');
    let isValid = true;
    const fields = [
      { name: 'firstName', error: 'Please Enter First Name' },
      { name: 'lastName', error: 'Please Enter Last Name' },
      { name: 'email', error: 'Please Enter Email' },
      { name: 'phone', error: 'Please Enter Phone Number' },
      { name: 'password', error: 'Please Enter Password' },
      { name: 'cnfpassword', error: 'Please Enter Confirm Password' },
    ];

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[0]?[789]\d{9}$/;

    

    fields.map((field) => {
      if (!registerData[field.name]) {
        handleError(field.error, field.name);
        isValid = false;
      } else if (field.name === 'email' && !emailRegex.test(registerData[field.name])) {
        handleError('Please Enter Valid Email', field.name);
        isValid = false;
      } else if (field.name === 'phone' && !phoneRegex.test(registerData[field.name])) {
        handleError('Please Enter Valid Phone Number', field.name);
        isValid = false;
      } else if (field.name === 'cnfpassword' && registerData[field.name] !== registerData['password']) {
        handleError('Password and Confirm Password should be same', field.name);
        isValid = false;
      } else if (field.name === 'password' && registerData[field.name].length < 6) {
        handleError('Password should be minimum 6 characters', field.name);
        isValid = false;
      } else {
        handleError(null, field.name);
      }
    })



    // if checkbox is not checked
    if (!toggleCheckBox) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      //isValid = false;
      return
    }

    // if all fields are valid then call api
    if (isValid) {
      registerUser();
      
      //setShowToast(false);
      
      //console.log(registerData)
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
        <View style={styles.registerContainer}>
          <View>
            <Text style={styles.registerNow}>Register Now</Text>
          </View>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            {/* FIRST NAME */}
            <Input
              value={registerData.firstName}
              placeholder='First Name'
              onChangeText={text => handleOnChange(text, 'firstName')}
              error={errors.firstName}
              onFocus={() => handleError(null, 'firstName')}
            />
            {/* LAST NAME */}
            <Input
              value={registerData.lastName}
              placeholder='Last Name'
              onChangeText={text => handleOnChange(text, 'lastName')}
              error={errors.lastName}
              onFocus={() => handleError(null, 'lastName')}
            />
            {/* EMAIL */}
            <Input
              value={registerData.email}
              placeholder='Email'
              onChangeText={text => handleOnChange(text, 'email')}
              error={errors.email}
              onFocus={() => handleError(null, 'email')}
            />
            {/* PHONE NUMBER */}
            <Input
              value={registerData.phone}
              placeholder='Phone Number'
              onChangeText={text => handleOnChange(text, 'phone')}
              error={errors.phone}
              onFocus={() => handleError(null, 'phone')}
            />
            {/* COUNTRY  */}
            {/* <DropdownPicker
            placeholder='Select Country'
            data={countryData}
            setSelected={handleCountrySelect}
          /> */}

            {/* STATE */}
            {/* <DropdownPicker
            placeholder='Select State'
            data={countryData}
            setSelected={handleStateSelect}
          /> */}

            {/* PASSWORD */}
            <Input
              secureTextEntry={true}
              value={registerData.password}
              placeholder='Password'
              onChangeText={text => handleOnChange(text, 'password')}
              error={errors.password}
              onFocus={() => handleError(null, 'password')}
            />

            {/* CONFIRM PASSWORD */}
            <Input
              value={registerData.cnfpassword}
              placeholder='Confirm Password'
              onChangeText={text => handleOnChange(text, 'cnfpassword')}
              error={errors.cnfpassword}
              onFocus={() => handleError(null, 'cnfpassword')}
            />

            {/* TERMS AND CONDITIONS */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: SIZES.padding,
                marginHorizontal: SIZES.padding * 0.4
              }}>
              <CheckBox
                disabled={false}
                boxType="square"
                onFillColor='rgba(0,108,246,1)'
                onCheckColor='#fff'
                //onTintColor='rgba(0,108,246,1)'
                value={toggleCheckBox}
                style={{
                  width: 15,
                  height: 15,
                  //tintColor: COLORS.primary,
                  marginRight: 10,
                  //borderWidth: 0.5
                }}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <CustomText
                label={'Accept Term and Condition'}
              />
              {showToast && (
                <Toast toastMessage='Please Accept Terms and Conditions' />
              )}


            </View>

            <TextButton
              onPress={handleSubmit}
              label={'SIGN UP'}
              labelStyle={{
                fontSize: 16,
                fontWeight: '700'
              }}
            />
            {/* ALREADY HAVE ACCOUNT */}
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '500'
                }}>Have alredy an account?
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={{
                    fontWeight: '800',
                    color: COLORS.primary
                  }}> Login Here</Text>
              </Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(39,139,138,1)'
  },
  registerContainer: {
    margin: SIZES.padding * 2,
    marginTop: 100,
    height: SIZES.height / 1.3,
    borderRadius: 10,
    backgroundColor: COLORS.light,
    padding: SIZES.padding * 3
  },
  registerNow: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 35,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 30
  }
})