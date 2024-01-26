import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationsScreen = () => {
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [pushUpdates, setPushUpdates] = useState(true);
  const [emailNewsletters, setEmailNewsletters] = useState(false);
  const [pushNewsletters, setPushNewsletters] = useState(true);
  const [emailPromotions, setEmailPromotions] = useState(false);
  const [pushPromotions, setPushPromotions] = useState(true);
  const [snoozeAll, setSnoozeAll] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedEmailUpdates = await AsyncStorage.getItem('emailUpdates');
        console.log('Loaded emailUpdates:', savedEmailUpdates);
        
        const savedPushUpdates = await AsyncStorage.getItem('pushUpdates');
        console.log('Loaded pushUpdates:', savedPushUpdates);

        const savedEmailNewsletters = await AsyncStorage.getItem('emailNewsletters');
        console.log('Loaded emailNewsletters:', savedEmailNewsletters);

        const savedPushNewsletters = await AsyncStorage.getItem('pushNewsletters');
        console.log('Loaded pushNewsletters:', savedPushNewsletters);

        const savedEmailPromotions = await AsyncStorage.getItem('emailPromotions');
        console.log('Loaded emailPromotions:', savedEmailPromotions);

        const savedPushPromotions = await AsyncStorage.getItem('pushPromotions');
        console.log('Loaded pushPromotions:', savedPushPromotions);

        const savedSnoozeAll = await AsyncStorage.getItem('snoozeAll');
        console.log('Loaded snoozeAll:', savedSnoozeAll);

        if (savedEmailUpdates !== null) setEmailUpdates(JSON.parse(savedEmailUpdates));
        if (savedPushUpdates !== null) setPushUpdates(JSON.parse(savedPushUpdates));
        if (savedEmailNewsletters !== null) setEmailNewsletters(JSON.parse(savedEmailNewsletters));
        if (savedPushNewsletters !== null) setPushNewsletters(JSON.parse(savedPushNewsletters));
        if (savedEmailPromotions !== null) setEmailPromotions(JSON.parse(savedEmailPromotions));
        if (savedPushPromotions !== null) setPushPromotions(JSON.parse(savedPushPromotions));
        if (savedSnoozeAll !== null) setSnoozeAll(JSON.parse(savedSnoozeAll));
      } catch (e) {
        console.error(e);
      }
    };

    loadSettings();
  }, []);

  const handleSnoozeAll = (value) => {
    setSnoozeAll(value);
    setModalVisible(value);
  };

  const handleSnoozeDuration = (duration) => {
    // Handle the snooze duration here
    setModalVisible(false);
  };

  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  const handleEmailUpdates = (value) => {
    console.log('handleEmailUpdates called with:', value);
    setEmailUpdates(value);
    saveSetting('emailUpdates', value);
  };
  
  const handlePushUpdates = (value) => {
    console.log('handlePushUpdates called with:', value);
    setPushUpdates(value);
    saveSetting('pushUpdates', value);
  };
  
  const handleEmailNewsletters = (value) => {
    console.log('handleEmailNewsletters called with:', value);
    setEmailNewsletters(value);
    saveSetting('emailNewsletters', value);
  };
  
  const handlePushNewsletters = (value) => {
    console.log('handlePushNewsletters called with:', value);
    setPushNewsletters(value);
    saveSetting('pushNewsletters', value);
  };
  
  const handleEmailPromotions = (value) => {
    console.log('handleEmailPromotions called with:', value);
    setEmailPromotions(value);
    saveSetting('emailPromotions', value);
  };
  
  const handlePushPromotions = (value) => {
    console.log('handlePushPromotions called with:', value);
    setPushPromotions(value);
    saveSetting('pushPromotions', value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Notifications</Text>
      <View style={styles.row}>
        <Text>Snooze All Notifications</Text>
        <Switch value={snoozeAll} onValueChange={handleSnoozeAll} />
      </View>
      <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Select Snooze Duration</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleSnoozeDuration(30)}>
              <Text style={styles.buttonText}>30 minutes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleSnoozeDuration(60)}>
              <Text style={styles.buttonText}>1 hour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleSnoozeDuration(120)}>
              <Text style={styles.buttonText}>2 hours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleSnoozeDuration(240)}>
              <Text style={styles.buttonText}>4 hours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleSnoozeDuration(480)}>
              <Text style={styles.buttonText}>8 hours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleSnoozeDuration('Till I change it again')}>
              <Text style={styles.buttonText}>Till I change it again</Text>
            </TouchableOpacity>
        </View>
          </View>      
      </Modal>
      <View style={styles.row}>
        <Text>Email Updates</Text>
        <Switch 
          disabled={snoozeAll} 
          value={emailUpdates} 
          onValueChange={handleEmailUpdates}
        />
      </View>
      <View style={styles.row}>
        <Text>Push Updates</Text>
        <Switch 
          disabled={snoozeAll} 
          value={pushUpdates} 
          onValueChange={handlePushUpdates} 
        />
      </View>
      <View style={styles.row}>
        <Text>Email Newsletters</Text>
        <Switch 
          disabled={snoozeAll} 
          value={emailNewsletters} 
          onValueChange={handleEmailNewsletters} 
        />
      </View>
      <View style={styles.row}>
        <Text>Push Newsletters</Text>
        <Switch 
          disabled={snoozeAll} 
          value={pushNewsletters} 
          onValueChange={handlePushNewsletters} 
        />
      </View>
      <View style={styles.row}>
        <Text>Email Promotions</Text>
        <Switch 
          disabled={snoozeAll} 
          value={emailPromotions}
          onValueChange={handleEmailPromotions} 
        />
      </View>
      <View style={styles.row}>
        <Text>Push Promotions</Text>
        <Switch 
          disabled={snoozeAll} 
          value={pushPromotions} 
          onValueChange={handlePushPromotions} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent', // This will create a semi-transparent background
  },
  modalView: {
    backgroundColor: "rgba(0,0,0,0.5)", // This will create a semi-transparent black background for the modal box
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor: "#4E9CAF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
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

export default NotificationsScreen;
