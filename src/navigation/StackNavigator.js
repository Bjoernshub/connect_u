import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../src/screens/LoginScreen'
import RegisterScreen from '../../src/screens/RegisterScreen'
import { StartScreen, MyTabs } from '../screens/StartScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="StartScreen">
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
