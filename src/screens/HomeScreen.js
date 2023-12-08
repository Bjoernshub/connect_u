import React, { useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import ProfilePictureContext from '../context/ProfilePictureContext';
import ThemeContext from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../Themes';

const BackgroundImage = ({ children }) => (
  <ImageBackground
    source={require('../../assets/homeBackground.png')}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    resizeMode="cover"
  >
    {children}
  </ImageBackground>
);

const HomeScreen = () => {
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
  });

  const { image } = useContext(ProfilePictureContext);

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

  useEffect(() => {
    startAnimation();
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
    </BackgroundImage>
  );
};


export default HomeScreen;