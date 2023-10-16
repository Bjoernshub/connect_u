import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [pushUpdates, setPushUpdates] = useState(true);
  const [emailNewsletters, setEmailNewsletters] = useState(false);
  const [pushNewsletters, setPushNewsletters] = useState(true);
  const [emailPromotions, setEmailPromotions] = useState(false);
  const [pushPromotions, setPushPromotions] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications Screen</Text>
      <View style={styles.row}>
        <Text>Email Updates</Text>
        <Switch value={emailUpdates} onValueChange={setEmailUpdates} />
      </View>
      <View style={styles.row}>
        <Text>Push Updates</Text>
        <Switch value={pushUpdates} onValueChange={setPushUpdates} />
      </View>
      <View style={styles.row}>
        <Text>Email Newsletters</Text>
        <Switch value={emailNewsletters} onValueChange={setEmailNewsletters} />
      </View>
      <View style={styles.row}>
        <Text>Push Newsletters</Text>
        <Switch value={pushNewsletters} onValueChange={setPushNewsletters} />
      </View>
      <View style={styles.row}>
        <Text>Email Promotions</Text>
        <Switch value={emailPromotions} onValueChange={setEmailPromotions} />
      </View>
      <View style={styles.row}>
        <Text>Push Promotions</Text>
        <Switch value={pushPromotions} onValueChange={setPushPromotions} />
      </View>
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

export default NotificationsScreen;
