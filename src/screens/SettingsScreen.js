import React, { useContext } from 'react';
import { View, TouchableOpacity, Switch, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../Themes';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    text: {
      color: theme.textColor,
    },
  });

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <TouchableOpacity onPress={() => handlePress('Notifications')}>
          <List.Item title="Notifications" titleStyle={{ color: theme.textColor }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('General')}>
          <List.Item title="General" titleStyle={{ color: theme.textColor }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('Privacy')}>
          <List.Item title="Privacy" titleStyle={{ color: theme.textColor }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('BlockedUsers')}>
          <List.Item title="Blocked Users" titleStyle={{ color: theme.textColor }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('HelpSupport')}>
          <List.Item title="Help & Support" titleStyle={{ color: theme.textColor }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('AboutLegal')}>
          <List.Item title="About & Legal" titleStyle={{ color: theme.textColor }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
          <Text style={styles.text}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </List.Section>
    </View>
  );
};

export default SettingsScreen;
