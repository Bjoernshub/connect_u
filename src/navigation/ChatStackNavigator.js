import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import ChatListScreen from '../screens/ChatListScreen';
import IndividualChatScreen from '../screens/IndividualChatScreen';

const Stack = createStackNavigator();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="IndividualChat" component={IndividualChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;