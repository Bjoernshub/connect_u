import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import LocationContext from '../../../context/LocationContext';
import { useContext } from 'react';

const DetectLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const locationContext = useContext(LocationContext);

  // Request location permission and get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log('Your location:', location);
      } catch (error) {
        console.error("Error getting location: ", error);
      }
    })();
  }, []);

  const handleConfirmLocation = async () => {
    try {  
      if (location) {
        try {
          let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
          console.log('Reverse geocode result:', reverseGeocode);
          if (reverseGeocode && reverseGeocode.length > 0) {
            updateLocation(reverseGeocode[0]); // save the reverse geocoded location in the context
          } else {
            console.log('No reverse geocode results'); 
          }
        } catch (error) {
          console.error("Error reverse geocoding location: ", error);
          // Fallback to raw coordinates
          updateLocation({
            address: `Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}`
          }); // save the raw location in the context
        }
      }  
      navigation.navigate('Profile');
    } catch (error) {
      console.log("Error confirming location: ", error);
    }
  };

  // Update location in context
  const updateLocation = (newLocation) => {
    // Check if the properties of newLocation are defined
    if (newLocation.street && newLocation.city && newLocation.region && newLocation.country) {
      // Create an address string
      let address = `${newLocation.street}, ${newLocation.city}, ${newLocation.region}, ${newLocation.country}`;
      locationContext.setLocation({ address });
    } else {
      // Set a default value for the address
      locationContext.setLocation({ address: 'Location not available' });
    }
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your location" 
              description="You are here"
            />
          </MapView>
          <View style={styles.button}>
            <Button title="OK" onPress={handleConfirmLocation} />
          </View>
        </>
      ) : (
        <Text>Loading map...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    top: 10, // 10px from the top
    right: 10, // 10px from the right
  },
});

export default DetectLocation;
