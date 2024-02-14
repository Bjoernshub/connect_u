import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../../src/screens/RegisterScreen'
import StartScreen from '../screens/StartScreen';
import BottomTabNavigator from '../navigation/BottomTabNavigator'

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="StartScreen">
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeStack" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
