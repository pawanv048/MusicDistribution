import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

const Forgot = ({navigation}) => {
  return (
    <View style={{
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>forgot</Text>
      <Button title='loginButton' onPress={() => navigation.navigate('Login')} />
    </View>
  )
}

export default Forgot;

const styles = StyleSheet.create({})