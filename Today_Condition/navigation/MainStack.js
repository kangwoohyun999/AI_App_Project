import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import HistoryScreen from "../screens/HistoryScreen";
import GraphScreen from "../screens/GraphScreen";
import CalendarScreen from "../screens/CalendarScreen";
import MusicRecommend from "../screens/MusicRecommend";
import RecommendList from "../screens/RecommendList";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
<<<<<<< Updated upstream
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Graph" component={GraphScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
=======
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="음악추천" component={MusicRecommend} />
      <Stack.Screen name="추천목록" component={RecommendList} />
>>>>>>> Stashed changes
    </Stack.Navigator>
  );
}
