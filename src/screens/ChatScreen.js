import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../Themes';

const ChatScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const navigation = useNavigation();

  useEffect(() => {
  navigation.setOptions({
    headerStyle: {
      backgroundColor: theme.backgroundColor,
    },
    headerTintColor: theme.textColor,
  });
  }, [theme]);

  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hello, how are you?',
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'Are you free this weekend?',
    },
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    text: {
      color: theme.textColor,
    },
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('IndividualChat', { chatName: item.name })}
    >
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>{item.name}</Text>
        <Text style={styles.text}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {chats.length > 0 ? (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text}>No chats available</Text>
        </View>
      )}
    </View>
  );
};

export default ChatScreen;
