import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InterestsContext from '../context/InterestsContext';
import ProfilePictureContext from '../context/ProfilePictureContext';

const ProfileScreen = () => {
  console.log('About You1: ', aboutYou)
  const navigation = useNavigation();
  const route = useRoute();
  const { interests } = useContext(InterestsContext);
  const [aboutYou, setAboutYou] = useState('A brief description');
  const { image, setImage } = useContext(ProfilePictureContext);
  console.log('About You2: ', aboutYou)

  const updateAboutYou = (newAboutYou) => {
    setAboutYou(newAboutYou);
    console.log('About You3: ', aboutYou)
  };

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

  const onPressEditInterests = () => {
    navigation.navigate('EditInterests', {
      selectedInterests: interests,
    });
  };

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
        <Text style={styles.description}>{aboutYou}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditAboutYou',
           { updateAboutYou: updateAboutYou })}>
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
        <TouchableOpacity onPress={onPressEditInterests}>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 5,
  },
});

export default ProfileScreen;  