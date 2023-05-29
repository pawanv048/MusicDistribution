import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions, useTheme } from "@react-navigation/native";
import {
  Dashboard,
  Home,
  Login,
  Register,
  DrawerContent,
  Forgot,
  Dummy,
} from "../screens";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      backBehavior="history"
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: 'Dashboard' }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Forgot"
        component={Forgot}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Dummy"
        component={Dummy}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;