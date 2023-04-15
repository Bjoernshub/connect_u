import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditInterestsScreen from '../screens/editScreens/EditInterestsScreen';
import EditAboutYouScreen from '../screens/editScreens/EditAboutYouScreen';
import EditLocationScreen from '../screens/editScreens/EditLocationScreen';
import EditUsernameScreen from '../screens/editScreens/EditUsernameScreen';
import EditSocialMediaLinksScreen from '../screens/editScreens/EditSocialMediaLinksScreen';
import AboutLegalScreen from '../screens/settingScreens/AboutLegalScreen';
import AccountScreen from '../screens/settingScreens/AccountScreen';
import BlockedUsersScreen from '../screens/settingScreens/BlockedUsersScreen';
import HelpSupportScreen from '../screens/settingScreens/HelpSupportScreen';
import LanguageScreen from '../screens/settingScreens/LanguageScreen';
import NotificationsScreen from '../screens/settingScreens/NotificationsScreen';
import PrivacyScreen from '../screens/settingScreens/PrivacyScreen';
import DetectLocation from '../screens/editScreens/locations/DetectLocation';


const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NestedProfile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="EditInterests"
        component={EditInterestsScreen}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                route.params?.onSaveButtonPress();
                navigation.goBack();
              }}
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: 'blue', fontSize: 16 }}>Save</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="EditAboutYou" component={EditAboutYouScreen} />  
      <Stack.Screen name="EditLocation" component={EditLocationScreen} />
      <Stack.Screen name="EditUsername" component={EditUsernameScreen} />  
      <Stack.Screen name="EditSocialMediaLinks" component={EditSocialMediaLinksScreen} />    
      <Stack.Screen name="AboutLegal" component={AboutLegalScreen} />  
      <Stack.Screen name="Account" component={AccountScreen} />  
      <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />  
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />  
      <Stack.Screen name="Language" component={LanguageScreen} />  
      <Stack.Screen name="Notifications" component={NotificationsScreen} />  
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen
        name="DetectLocation"
        component={DetectLocation}
        options={{ title: 'Detect Location' }}
      />         
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileStackNavigator;