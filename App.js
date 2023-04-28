import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
// import { createStore } from '@reduxjs/toolkit';
import { dashboardSlice } from './src/redux/reducers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Dashboard,
  Home,
  Login,
  Register,
  DrawerContent,
  Forgot,
} from './src/screens/index';

import { store } from './src/redux/store';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// const store = createStore(dashboardSlice.reducer);


const App = () => {
  console.log('render App');
  //alert(STRIP_KEY)
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          <Drawer.Screen name="Home" component={Home} options={{ title: 'Dashboard' }} />
          {/* <Drawer.Screen name="PaymentScreen" component={PaymentScreen} /> */}
          <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Drawer.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Drawer.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});

export default App;
