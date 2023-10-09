import React, { useState } from 'react';
import { View, Text, Button, Switch, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditLocationScreen = () => {
  const navigation = useNavigation();
  const [isDetectLocation, setIsDetectLocation] = useState(true);

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
      />
      <View style={styles.switchContainer}>
        <Button
          title="Set Location"
          onPress={handleSetLocation}
          disabled={isDetectLocation}
        />
        <Switch
          value={isDetectLocation}
          onValueChange={(newValue) => setIsDetectLocation(newValue)}
          style={styles.switch}
        />
        <Button
          title="Detect Location"
          onPress={handleDetectLocation}
          disabled={!isDetectLocation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  switch: {
    marginHorizontal: 10,
  },
});

export default EditLocationScreen;
