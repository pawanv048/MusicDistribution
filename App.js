import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './src/screens/dashboard';
import DrawerContent from './src/screens/drawer';
import Home from './src/screens/home';
import PaymentScreen from './src/screens/PaymentScreen';

// import {Dashboard} from './src/screens/index';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  //alert(STRIP_KEY)
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="dashboard" drawerContent={props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="dashboard" component={Dashboard} options={{title: 'Dashboard'}}/>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="PaymentScreen" component={PaymentScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
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
