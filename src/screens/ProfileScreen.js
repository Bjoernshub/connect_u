import React, { useState, useEffect, useContext  } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InterestsContext from '../context/InterestsContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const { interests } = useContext(InterestsContext);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate('Settings')} title="⚙️" />
      ),
    });
  }, [navigation]);

  console.log('Interests in ProfileScreen:', interests);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          style={styles.profileImage}
          source={
            image
              ? { uri: image }
              : {
                  uri: 'https://via.placeholder.com/150',
                }
          }
        />
      </TouchableOpacity>
      <Text style={styles.username}>Username</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <TouchableOpacity onPress={() => navigation.navigate('EditUsername')}>
          <MaterialCommunityIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>About you</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Text style={styles.description}>A brief description about yourself</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditAboutYou')}>
          <MaterialCommunityIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Location</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Text style={styles.description}>City, Country</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditLocation')}>
          <MaterialCommunityIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Interest tags</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Text style={styles.description}>{interests.join(', ')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditInterests')}>
          <MaterialCommunityIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>   
      <Text style={styles.title}>Social media links</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Text style={styles.description}>links</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditSocialMediaLinks')}>
          <MaterialCommunityIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default ProfileScreen;