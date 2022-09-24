import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./views/Login";
import BottomTabNavigator from "./components/BottomTabNavigator";
import "./global";
import Staff from "./views/Staff";

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
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
