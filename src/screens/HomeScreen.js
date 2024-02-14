import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler
} from 'react-native';
import ProfilePictureContext from '../context/ProfilePictureContext';
import ThemeContext from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../Themes';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Picker } from '@react-native-picker/picker';

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

  const backAction = useCallback(() => {
      BackHandler.exitApp();
      return true;
  }, []);

  useEffect(() => {
      navigation.addListener('beforeRemove', (e) => {
          e.preventDefault();
          backAction();
      });

      return () => {
          navigation.removeListener('beforeRemove', backAction);
      };
  }, [navigation, backAction]);

  const styles = StyleSheet.create({
    container: {
      //alignItems: 'center',
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

  const [minAge, setMinAge] = useState(16);
  const [maxAge, setMaxAge] = useState(100);

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

  const [myOnlineStatus, setMyOnlineStatus] = useState(null);
  const [myVerificationStatus, setMyVerificationStatus] = useState(null);

  const [onlineStatus, setOnlineStatus] = useState("no filter");
  const [verificationStatus, setVerificationStatus] = useState("allUsers");

  const toggleFilter = () => {
    Animated.timing(slideAnim, {
      toValue: isFilterVisible ? Dimensions.get('window').width : 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setFilterVisible(!isFilterVisible));
  };

  useEffect(() => {
    startAnimation();
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleFilter}>
          <Ionicons name="ios-filter" size={24} color={theme.textColor} style={{ marginRight: 20 }} />
        </TouchableOpacity>
      ),
    });
  }, [isFilterVisible]);

  

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
           <View style={{borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 5, width: '100%', marginTop: 20}}>
            <Text style={{color: 'black'}}>Show in Radius</Text>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={radius}
              sliderLength={280}
              onValueChange={value => setRadius(value)}
              minimumTrackTintColor='lightgreen'
              maximumTrackTintColor='lightgreen'
              thumbTintColor='green' 
            />
           </View> 
          <Text style={{color: 'black'}}>{radius} km</Text>
          <View style={{borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 5, width: '100%', marginTop: 20}}>
              <Text style={{color: 'black'}}>Age Range</Text>
              <MultiSlider
                style={{width: '100%', height: 40}}
                values={[minAge, maxAge]}
                sliderLength={280}
                onValuesChange={values => {setMinAge(values[0]); setMaxAge(values[1]);}}
                min={16}
                max={100}
                step={1}
                allowOverlap={false}
                snapped
                minMarkerOverlapDistance={0}
                trackStyle={{backgroundColor: 'lightgreen'}} 
                selectedStyle={{backgroundColor: 'lightgreen'}}
                unselectedStyle={{backgroundColor: 'lightgreen'}}
                markerStyle={{backgroundColor: 'green'}} 
              />
              <Text style={{color: 'black'}}>{minAge} - {maxAge} years</Text>
          </View>
          <View style={{borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 5, width: '100%', marginTop: 20}}>
            <Text style={{color: 'black'}}>Online Status</Text>
            <Picker
              selectedValue={onlineStatus}
              onValueChange={(itemValue, itemIndex) => setOnlineStatus(itemValue)}
              style={{backgroundColor: 'white', color: 'black'}}
            >
              <Picker.Item label="Somewhen" value="no filter" style={{fontSize: 15}} />
              <Picker.Item label="Online" value="online" style={{fontSize: 15}} />
              <Picker.Item label="Recently Online (Today)" value="recentlyOnline" style={{fontSize: 15}} />
              <Picker.Item label="Online Last 7 Days" value="onlineLast7Days" style={{fontSize: 15}}  />
            </Picker>
          </View>
          <View style={{borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 5, width: '100%', marginTop: 20}}>
            <Text style={{color: 'black'}}>Verification Status</Text>
            <Picker
              selectedValue={verificationStatus}
              onValueChange={(itemValue, itemIndex) => setVerificationStatus(itemValue)}
              style={{backgroundColor: 'white', color: 'black'}}
            >
              <Picker.Item label="All Users" value="allUsers" style={{fontSize: 15}}/>
              <Picker.Item label="Verified Users Only" value="verifiedUsers" style={{fontSize: 15}}/>
            </Picker>
          </View>  
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