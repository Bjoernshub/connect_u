import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import ThemeContext from '../../context/ThemeContext';

const ThemeScreen = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const getStyles = (isDarkMode) => {
    return {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkMode ? '#121212' : '#fff',
      },
      text: {
        color: isDarkMode ? '#fff' : '#000',
      },
    };
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Theme Screen</Text>
      <Text style={styles.text}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
  );
};

export default ThemeScreen;
