import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import LocationContext from '../../../context/LocationContext';
import axios from 'axios';

const SetLocation = ({ navigation }) => {
  const { setLocation } = useContext(LocationContext);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef();

  const handleConfirmLocation = async () => {
    const region = await mapRef.current.getCamera();
    setSelectedLocation({
      latitude: region.center.latitude,
      longitude: region.center.longitude,
    });
  };

  const getGeocode = async (lat, lon) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat,
          lon,
          format: 'json',
        },
      });

      if (response.data) {
        return response.data.display_name;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      getGeocode(selectedLocation.latitude, selectedLocation.longitude)
        .then(address => {
          setLocation({
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            address,
          });

          
          console.log('Set location:', {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            address,
          });

          navigation.navigate('Profile');
        })
        .catch(error => console.warn(error));
    }
  }, [selectedLocation]);


  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={styles.button}>
        <Button title="OK" onPress={handleConfirmLocation} />
      </View>
      <Image source={require('./iconLocation.png')} style={styles.marker} />
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    button: {
        position: 'absolute',
        top: 10, // Adjust this value as needed
        right: 10, // Adjust this value as needed
    },
    marker: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 48, // Set the width of the icon
        height: 48, // Set the height of the icon
        marginTop: -24, // Half of the height
        marginLeft: -24, // Half of the width
    },
});


export default SetLocation;
