import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StartScreen" component={StartScreen} />
    <Stack.Screen name="HomeStack" component={BottomTabNavigator} />
  </Stack.Navigator>
);

export default StackNavigator;
