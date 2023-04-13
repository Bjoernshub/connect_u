import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const IndividualChatScreen = ({ route }) => {
  const { chatName } = route.params;
  const [messages, setMessages] = useState([]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => setMessages(GiftedChat.append(messages, newMessages))}
      user={{
        _id: 1,
      }}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
      scrollToBottom={true}
    />
  );
};

export default IndividualChatScreen;