import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';

const GeneralScreen = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>General Settings</Text>
            <View style={styles.row}>
                <Text>Dark Mode</Text>
                <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
            <View style={styles.row}>
                <Text>Notifications</Text>
                <Switch value={notifications} onValueChange={setNotifications} />
            </View>
            <Button title="Change Language" onPress={() => { }} />
            <Button title="Privacy Settings" onPress={() => { }} />
            <Button title="Security Settings" onPress={() => { }} />
            <Button title="Update Account Information" onPress={() => { }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 15,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
    },
});

export default GeneralScreen;
