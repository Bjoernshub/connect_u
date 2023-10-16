import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import LocationContext from '../../../context/LocationContext';

Geocoder.init('YOUR_GOOGLE_MAPS_API_KEY'); // Ersetze dies durch deinen tatsächlichen Google Maps API-Schlüssel

const SetLocation = () => {
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const { setLocation } = useContext(LocationContext);
    const [selectedLocation, setSelectedLocation] = useState(null);


    const handleConfirmLocation = async () => {
        // Get the current region from the map
        const region = await mapRef.current.getCamera();

        // Save the selected location
        setLocation({
            latitude: region.center.latitude,
            longitude: region.center.longitude,
        });

        // Navigate to the ProfileScreen
        navigation.navigate('ProfileScreen');
    };

    useEffect(() => {
        if (selectedLocation) {
            // Get the address for the selected location
            Geocoder.from(selectedLocation.latitude, selectedLocation.longitude)
                .then(json => {
                    var addressComponent = json.results[0].formatted_address;
                    console.log(addressComponent);

                    // Save the selected location with address
                    setLocation({
                        latitude: selectedLocation.latitude,
                        longitude: selectedLocation.longitude,
                        address: addressComponent,
                    });

                    // Navigate to the ProfileScreen
                    navigation.navigate('ProfileScreen');
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
