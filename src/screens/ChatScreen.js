import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('IndividualChat', { chatName: item.name })}
    >
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Text>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {chats.length > 0 ? (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No chats available</Text>
        </View>
      )}
    </View>
  );
};

export default ChatScreen;