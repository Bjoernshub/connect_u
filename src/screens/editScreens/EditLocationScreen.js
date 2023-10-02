import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditLocationScreen = () => {
  const navigation = useNavigation();

  const handleSetLocation = () => {

  };

  const handleDetectLocation = () => {
    navigation.navigate('DetectLocation');
  };



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text></Text>
      <Button
        title="Set Location"
        onPress={handleSetLocation}
      />
      <Button
        title="Detect Location"
        onPress={handleDetectLocation}
      />
    </View>
  );
};

export default EditLocationScreen;