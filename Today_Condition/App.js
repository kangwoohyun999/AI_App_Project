import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// 화면들 가져오기
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import HistoryScreen from "./screens/HistoryScreen";
import GraphScreen from "./screens/GraphScreen";
import CalendarScreen from "./screens/CalendarScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
