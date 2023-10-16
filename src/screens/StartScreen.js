import React from 'react';
import { View, Text, Button } from 'react-native';

const StartScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Willkommen bei Connect U!</Text>
            <Button
                title="Anmelden"
                onPress={() => navigation.navigate('Login')} // Navigiere zum Anmeldungs-Bildschirm
            />
            <Button
                title="Registrieren"
                onPress={() => navigation.navigate('Register')} // Navigiere zum Registrierungs-Bildschirm
            />
        </View>
    );
};

export default StartScreen;
