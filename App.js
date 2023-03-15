import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './src/screens/dashboard';
import DrawerContent from './src/screens/drawer';
import Home from './src/screens/home';
import PaymentScreen from './src/screens/PaymentScreen';
import Login from './src/screens/login';
import Register from './src/screens/register';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {

  
  //alert(STRIP_KEY)
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Dashboard" component={Dashboard} options={{title: 'Dashboard'}}/>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="PaymentScreen" component={PaymentScreen} />
        <Drawer.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Drawer.Screen name="Register" component={Register} options={{headerShown: false}}/>
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
