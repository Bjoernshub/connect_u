import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';

const SetLocation = () => {
    const handleConfirmLocation = () => {
        // Save the selected location
    };

    return (
        <View style={styles.container}>
            <MapView
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
