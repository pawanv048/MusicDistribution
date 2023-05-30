import { StyleSheet, Text, View, AppState, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
// import { createStore } from '@reduxjs/toolkit';
import { dashboardSlice } from './src/redux/reducers';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/redux/store';
import { ThemeContext } from './src/utils/theme-context';
import { dark, standard } from './src/constants/theme';
import DrawerNavigator from './src/config/router';


const defaultTheme = Appearance.getColorScheme();


// const store = createStore(dashboardSlice.reducer);


const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(
    defaultTheme === "dark" ? "dark" : "",
  );

  console.log('render App');
  //alert(STRIP_KEY)
  return (
    <ThemeContext.Provider value={{ theme: standard }}>
      <Provider store={store}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </Provider>
    </ThemeContext.Provider>
  );
}


export default App;
