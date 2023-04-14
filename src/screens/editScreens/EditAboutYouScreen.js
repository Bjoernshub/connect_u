import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditAboutYouScreen = () => {
  const [aboutYouText, setAboutYouText] = useState('');
  const navigation = useNavigation();


  const onSaveButtonPress = () => {
      // Save the aboutYouText or any other action you want to perform before navigating
      navigation.goBack();
    };


  return (
    <View style={styles.container}>
      <Text>Edit About You Screen</Text>
      <TextInput
        style={styles.input}
        multiline
        onChangeText={setAboutYouText}
        value={aboutYouText}
        placeholder="Write something about yourself..."
      />
      <TouchableOpacity style={styles.saveButton} onPress={onSaveButtonPress}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditAboutYouScreen;
