import { StyleSheet, Text, View, AppState, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
// import { createStore } from '@reduxjs/toolkit';
import { dashboardSlice } from './src/redux/reducers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { store } from './src/redux/store';
import { ThemeContext } from './src/utils/theme-context';
import { dark, standard } from './src/constants/theme';
import DrawerNavigator from './src/config/router';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const defaultTheme = Appearance.getColorScheme();


// const store = createStore(dashboardSlice.reducer);


const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(
    defaultTheme === "dark" ? "dark" : "",
  );

  console.log('render App');
  //alert(STRIP_KEY)
  return (
    <ThemeContext.Provider
      value={{
        theme: standard,
      }}
    >
      <Provider store={store}>
        <NavigationContainer>
          {/* <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Home" component={Home} options={{ title: 'Dashboard' }} />
            <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Drawer.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Drawer.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
            <Drawer.Screen name="Dummy" component={Dummy} options={{ headerShown: true }} />
          </Drawer.Navigator> */}
          <DrawerNavigator />
        </NavigationContainer>
      </Provider>
    </ThemeContext.Provider>
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
