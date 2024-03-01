import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const EditLocationScreen = () => {
  const navigation = useNavigation();
  const [locationMethod, setLocationMethod] = useState('detect');

  const handleSetLocation = () => {
    navigation.navigate('SetLocation');
  };

  const handleDetectLocation = () => {
    navigation.navigate('DetectLocation');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/LocationBackground.jpg')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <View style={styles.radioContainer}>
        <Text style={styles.heading}>Choose Location Method</Text>
        <RadioButton.Group onValueChange={newValue => setLocationMethod(newValue)} value={locationMethod}>
          <View style={styles.radioButton}>
            <Button
              title="Set Location"
              onPress={handleSetLocation}
              disabled={locationMethod !== 'set'}
            />
            <RadioButton value="set" />
          </View>
          <View style={styles.radioButton}>
            <Button
              title="Detect Location"
              onPress={handleDetectLocation}
              disabled={locationMethod !== 'detect'}
            />
            <RadioButton value="detect" />
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  radioContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default EditLocationScreen;