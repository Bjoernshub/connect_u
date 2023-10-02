import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';

const EditAboutYouScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [aboutYouText, setAboutYouText] = useState('');

  const onSave = () => {
    console.log('About you text: ', aboutYouText);
    route.params.updateAboutYou(aboutYouText);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About you</Text>
      <TextInput
        style={styles.input}
        multiline
        onChangeText={setAboutYouText}
        value={aboutYouText}
        placeholder="Write a brief description about yourself"
      />
      <Button title="Save" onPress={onSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
});

export default EditAboutYouScreen;
