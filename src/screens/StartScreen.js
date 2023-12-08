import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileWrapper from '../navigation/ProfileWrapper';
import ChatStackNavigator from '../navigation/ChatStackNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Your Profile') {
                        iconName = focused ? 'account' : 'account-outline';
                    } else if (route.name === 'Chats') {
                        iconName = focused ? 'chat' : 'chat-outline';
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Your Profile" component={ProfileWrapper} />
            <Tab.Screen name="Chats" component={ChatStackNavigator} />
        </Tab.Navigator>
    );
};


const StartScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Willkommen bei Connect U!</Text>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Registration"
                onPress={() => navigation.navigate('Register')}
            />
            <Button
                title="HomePage"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { StartScreen, MyTabs };

