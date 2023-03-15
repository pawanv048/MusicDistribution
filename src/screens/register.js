import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { SIZES, COLORS } from '../constants/theme';
import { Input, DropdownPicker, CustomText, TextButton } from '../custom/component';
import CheckBox from '@react-native-community/checkbox';


const Register = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <View>
          <Text style={styles.registerNow}>Register Now</Text>
        </View>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Input placeholder='First Name' />
          <Input placeholder='Last Name' />
          <Input placeholder='Email' />
          <Input placeholder='Phone Number' />
          <DropdownPicker placeholder='Select Country' />
          <DropdownPicker placeholder='Select State' />
          <Input placeholder='Password' />
          <Input placeholder='Confirm Password' />

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