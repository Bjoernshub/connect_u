import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View>
      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <TouchableOpacity onPress={() => handlePress('Notifications')}>
          <List.Item title="Notifications" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('Account')}>
          <List.Item title="Account" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('Privacy')}>
          <List.Item title="Privacy" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('Language')}>
          <List.Item title="Language" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('BlockedUsers')}>
          <List.Item title="Blocked Users" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('HelpSupport')}>
          <List.Item title="Help & Support" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('AboutLegal')}>
          <List.Item title="About & Legal" />
        </TouchableOpacity>
        {/* Add the remaining List items */}
      </List.Section>
    </View>
  );
};

export default SettingsScreen;