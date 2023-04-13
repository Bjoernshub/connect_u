import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import ProfileWrapper from './src/navigation/ProfileWrapper';
import ChatStackNavigator from './src/navigation/ChatStackNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InterestsProvider } from './src/context/InterestsContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <InterestsProvider>
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

              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#1E90FF',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: [
              {
                display: 'flex',
              },
              null,
            ],
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Your Profile" component={ProfileWrapper} />
          <Tab.Screen name="Chats" component={ChatStackNavigator} />
        </Tab.Navigator>
      </InterestsProvider>
    </NavigationContainer>
  );
}
