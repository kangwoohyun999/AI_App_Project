// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import GraphScreen from "./screens/GraphScreen";
import ChatScreen from "./screens/ChatScreen";
import CalendarScreen from "./screens/CalendarScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createStackNavigator();

import MainStack from "./navigation/MainStack";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="캘린더" component={CalendarScreen} />
        <Stack.Screen name="챗봇" component={ChatScreen} />
        <Stack.Screen name="그래프" component={GraphScreen} />
        <Stack.Screen name="기록" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}