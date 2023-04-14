import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const DetectLocation = () => {
  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      console.log('Your location:', location);
    };

    requestLocation();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Getting your location...</Text>
    </View>
  );
};

export default DetectLocation;
