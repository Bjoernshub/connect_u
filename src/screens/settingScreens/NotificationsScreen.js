import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const NotificationsScreen = () => {
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [pushUpdates, setPushUpdates] = useState(true);
  const [emailNewsletters, setEmailNewsletters] = useState(false);
  const [pushNewsletters, setPushNewsletters] = useState(true);
  const [emailPromotions, setEmailPromotions] = useState(false);
  const [pushPromotions, setPushPromotions] = useState(true);
  const [snoozeAll, setSnoozeAll] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSnoozeAll = (value) => {
    setSnoozeAll(value);
    setModalVisible(value);
  };

  const handleSnoozeDuration = (duration) => {
    // Handle the snooze duration here
    setModalVisible(false);
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
          onValueChange={setEmailUpdates}
        />
      </View>
      <View style={styles.row}>
        <Text>Push Updates</Text>
        <Switch 
          disabled={snoozeAll} 
          value={pushUpdates} 
          onValueChange={setPushUpdates} 
        />
      </View>
      <View style={styles.row}>
        <Text>Email Newsletters</Text>
        <Switch 
          disabled={snoozeAll} 
          value={emailNewsletters} 
          onValueChange={setEmailNewsletters} 
        />
      </View>
      <View style={styles.row}>
        <Text>Push Newsletters</Text>
        <Switch 
          disabled={snoozeAll} 
          value={pushNewsletters} 
          onValueChange={setPushNewsletters} 
        />
      </View>
      <View style={styles.row}>
        <Text>Email Promotions</Text>
        <Switch 
          disabled={snoozeAll} 
          value={emailPromotions}
          onValueChange={setEmailPromotions} 
        />
      </View>
      <View style={styles.row}>
        <Text>Push Promotions</Text>
        <Switch 
          disabled={snoozeAll} 
          value={pushPromotions} 
          onValueChange={setPushPromotions} 
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
