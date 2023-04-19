import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import ProfileWrapper from './src/navigation/ProfileWrapper';
import ChatStackNavigator from './src/navigation/ChatStackNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InterestsProvider } from './src/context/InterestsContext';
import { ProfilePictureProvider } from './src/context/ProfilePictureContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { useContext } from 'react';
import ThemeContext from './src/context/ThemeContext';
import { lightTheme, darkTheme } from './src/Themes';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <ProfilePictureProvider>
          <InterestsProvider>
            <MyTabs />
          </InterestsProvider>
        </ProfilePictureProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

const MyTabs = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

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

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondary,
        tabBarStyle: [
          {
            display: 'flex',
            backgroundColor: theme.backgroundColor,
          },
          null,
        ],
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Your Profile" component={ProfileWrapper} />
      <Tab.Screen name="Chats" component={ChatStackNavigator} />
    </Tab.Navigator>
  );
};

export default App;
