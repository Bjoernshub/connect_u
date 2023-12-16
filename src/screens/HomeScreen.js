import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import ProfilePictureContext from '../context/ProfilePictureContext';
import ThemeContext from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../Themes';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const BackgroundImage = ({ children }) => (
  <ImageBackground
    source={require('../../assets/homeBackground.png')}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    resizeMode="cover"
  >
    {children}
  </ImageBackground>
);

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    text: {
      color: theme.textColor,
    },
    modalView: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 35,
      marginTop: Dimensions.get('window').height * 0.3,
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
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    },
  });

  const { image } = useContext(ProfilePictureContext);

  const [isFilterVisible, setFilterVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;

  const handleFilterPress = () => {
    setFilterVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleClosePress = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').width,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setFilterVisible(false));
  };

  const scaleAnimation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const [radius, setRadius] = useState(1);

  useEffect(() => {
    startAnimation();
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleFilterPress}>
          <Ionicons name="ios-filter" size={24} color={theme.textColor} style={{ marginRight: 20 }} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Animated.View
          style={{
            position: 'absolute',
            width: 75,
            height: 75,
            borderRadius: 37.5,
            borderWidth: 0,
            opacity: scaleAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            transform: [
              {
                scale: scaleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 3],
                }),
              },
            ],
          }}
        />
        <View
          style={{
            width: 75,
            height: 75,
            borderRadius: 37.5,
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
        >
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            source={
              image
                ? { uri: image }
                : {
                    uri: 'https://via.placeholder.com/150',
                  }
            }
          />
        </View>
      </View>
      {isFilterVisible && (
        <Animated.View style={{ ...styles.modalView, right: slideAnim }}>
          <Text style={{color: 'black'}}>Show in Radius</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={radius}
            onValueChange={value => setRadius(value)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Text style={{color: 'black'}}>{radius} km</Text>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={handleClosePress}
          >
            <Text style={styles.textStyle}>Hide</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </BackgroundImage>
  );
};

export default HomeScreen;