import React, { useRef, useState, useContext } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import LocationContext from '../../../context/LocationContext';

const SetLocation = () => {
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const { setLocation } = useContext(LocationContext);

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
