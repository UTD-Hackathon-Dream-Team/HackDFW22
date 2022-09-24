import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import HomeScreen from "../views/Home";
import GoalScreen from "../views/Goals";
import HistoryScreen from "../views/History";

import { Feather } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  navigation.setOptions({ headerShown: false });

  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color="black" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Staff"
        component={HistoryScreen}
        options={{
          tabBarLabel: "Staff",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={24} color="black" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Goals"
        component={GoalScreen}
        options={{
          tabBarLabel: "Goals",
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={24} color="black" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
