import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./views/Login";
import BottomTabNavigator from "./components/BottomTabNavigator";
import "./global";
import Staff from "./views/Staff";
import Story1 from "./views/Story1";
import Story2 from "./views/Story2";
import Tracker from "./views/NewTracker";

const Stack = createNativeStackNavigator();

console.disableYellowBox = true;

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen
            name="LogIn"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen name="Staff" component={Staff} />
          <Stack.Screen name="What is flu?" component={Story1} />
          <Stack.Screen name="What is virus?" component={Story2} />
          <Stack.Screen name="Tracker" component={Tracker} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
