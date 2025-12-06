// navigation/MainStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import HistoryScreen from "../screens/HistoryScreen";
import GraphScreen from "../screens/GraphScreen";
import CalendarScreen from "../screens/CalendarScreen";
import MusicRecommend from "../screens/MusicRecommend";
import RecommendList from "../screens/RecommendList";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🔹 로그인 이후에 쓰는 탭 네비게이터 (예전 App.js 내용 그대로)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let icon;

          if (route.name === "홈") icon = focused ? "home" : "home-outline";
          else if (route.name === "캘린더")
            icon = focused ? "calendar" : "calendar-outline";
          else if (route.name === "챗봇")
            icon = focused ? "chatbubble" : "chatbubble-outline";
          else if (route.name === "그래프")
            icon = focused ? "pie-chart" : "pie-chart-outline";
          else if (route.name === "기록")
            icon = focused ? "document-text" : "document-text-outline";

          return <Ionicons name={icon} size={23} color={color} />;
        },
      })}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="캘린더" component={CalendarScreen} />
      <Tab.Screen name="챗봇" component={ChatScreen} />
      <Tab.Screen name="그래프" component={GraphScreen} />
      <Tab.Screen name="기록" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

// 🔹 전체 앱: [Login] → [MainTabs]
export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Graph" component={GraphScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="음악추천" component={MusicRecommend} />
      <Stack.Screen name="추천목록" component={RecommendList} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}
