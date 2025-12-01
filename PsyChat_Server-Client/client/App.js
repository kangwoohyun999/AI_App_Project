import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import ApiKeyLoginScreen from './screens/ApiKeyLoginScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PsyChatScreen from './screens/PsyChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ApiKeyLogin" component={ApiKeyLoginScreen} options={{ title: 'OpenAI API Key' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="PsyChat" component={PsyChatScreen} options={{ title: 'PsyChat' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
