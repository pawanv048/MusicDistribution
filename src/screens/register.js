import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SIZES, COLORS } from '../constants/theme';
import { Input, DropdownPicker, CustomText, TextButton } from '../custom/component';
import CheckBox from '@react-native-community/checkbox';


const Register = ({ navigation }) => {

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)
  const [errors, setErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [registerData, setregisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    cnfpassword: ""
  });

  //console.log(registerData)

  // handle login data change
  const handleOnChange = (text, registerData) => {
    setregisterData(prevState => ({ ...prevState, [registerData]: text }));
    setErrors(prevState => ({ ...prevState, [registerData]: null }));
  };
  // Error Messages
  const handleError = (errorMessage, registerData) => {
    setErrors(prevState => ({ ...prevState, [registerData]: errorMessage }));
  }

  
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

    fields.map((field) => {
      if (!registerData[field.name]) {
        handleError(field.error, field.name);
        isValid = false;
      }
    })
    if (isValid) {
      navigation.navigate('Login')
      // console.log(registerData)
    }
  };





  return (
    <View style={styles.container}>
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
            placeholder='First Name'
            onChangeText={text => handleOnChange(text, 'firstName')}
            error={errors.firstName}
            onFocus={() => handleError(null, 'firstName')}
          />
          {/* LAST NAME */}
          <Input
            placeholder='Last Name'
            onChangeText={text => handleOnChange(text, 'lastName')}
            error={errors.lastName}
            onFocus={() => handleError(null, 'lastName')}
          />
          {/* EMAIL */}
          <Input
            placeholder='Email'
            onChangeText={text => handleOnChange(text, 'email')}
            error={errors.email}
            onFocus={() => handleError(null, 'email')}
          />
          {/* PHONE NUMBER */}
          <Input
            placeholder='Phone Number'
            onChangeText={text => handleOnChange(text, 'phone')}
            error={errors.phone}
            onFocus={() => handleError(null, 'phone')}
          />
          <DropdownPicker placeholder='Select Country' />
          <DropdownPicker placeholder='Select State' />

          {/* PASSWORD */}
          <Input
            placeholder='Password'
            onChangeText={text => handleOnChange(text, 'password')}
            error={errors.password}
            onFocus={() => handleError(null, 'password')}
          />

          {/* CONFIRM PASSWORD */}
          <Input
            placeholder='Confirm Password'
            onChangeText={text => handleOnChange(text, 'cnfpassword')}
            error={errors.cnfpassword}
            onFocus={() => handleError(null, 'cnfpassword')}
          />

          {/* TERMS */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: SIZES.padding
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
            <CustomText label={'Accept Term and Condition'} />
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