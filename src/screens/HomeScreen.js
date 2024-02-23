import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, ImageBackground, Image, Animated, Easing, StyleSheet, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import ProfilePictureContext from '../context/ProfilePictureContext';
import ThemeContext from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../Themes';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { backgroundColor: 'transparent' },
  text: theme => ({ color: theme.textColor }),
  modalView: {
    position: 'absolute', width, height, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 35, marginTop: height * 0.3, alignItems: "center", shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5
  },
  textStyle: { color: "black", fontWeight: "bold", textAlign: "center" },
  pickerItem: { fontSize: 15 } // Added font size for visibility
});

const BackgroundImage = ({ children }) => (
  <ImageBackground source={require('../../assets/homeBackground.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} resizeMode="cover">
    {children}
  </ImageBackground>
);

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { image } = useContext(ProfilePictureContext);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [radius, setRadius] = useState(1);
  const [minAge, setMinAge] = useState(16);
  const [maxAge, setMaxAge] = useState(100);
  const [onlineStatus, setOnlineStatus] = useState("no filter");
  const [verificationStatus, setVerificationStatus] = useState("allUsers");
  const slideAnim = useRef(new Animated.Value(width)).current;
  const scaleAnimation = useRef(new Animated.Value(0)).current;

  const toggleFilter = useCallback(() => {
    Animated.timing(slideAnim, { toValue: isFilterVisible ? width : 0, duration: 500, useNativeDriver: false }).start(() => setFilterVisible(!isFilterVisible));
  }, [isFilterVisible]);

  const startAnimation = useCallback(() => {
    Animated.loop(Animated.timing(scaleAnimation, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: true })).start();
  }, []);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      backAction();
    });

    return () => navigation.removeListener('beforeRemove', backAction);
  }, [navigation]);

  useEffect(() => {
    startAnimation();
    navigation.setOptions({
      headerRight: () => (<TouchableOpacity onPress={toggleFilter}><Ionicons name="ios-filter" size={24} color={theme.textColor} style={{ marginRight: 20 }} /></TouchableOpacity>),
    });
  }, [isFilterVisible, startAnimation, toggleFilter, theme]);

  return (
    <BackgroundImage>
      <View style={styles.container}>
        {/* Profile Image Container */}
        <View style={{ width: 75, height: 75, borderRadius: 37.5, overflow: 'hidden', backgroundColor: 'transparent' }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={image ? { uri: image } : { uri: 'https://via.placeholder.com/150' }}
          />
        </View>
      </View>
      {isFilterVisible && (
        <Animated.View style={[styles.modalView, { right: slideAnim }]}>
          {/* Slider for Radius Selection */}
          <View style={{ borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 5, width: '100%', marginTop: 20 }}>
            <Text style={{ color: 'black' }}>Show in Radius</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={radius}
              onValueChange={setRadius}
              minimumTrackTintColor='lightgreen'
              maximumTrackTintColor='#000000'
              thumbTintColor='green'
            />
            <Text style={{ color: 'black' }}>{radius} km</Text>
          </View>
          {/* MultiSlider for Age Range Selection */}
          <View style={{ borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 5, width: '100%', marginTop: 20 }}>
            <Text style={{ color: 'black' }}>Age Range</Text>
            <MultiSlider
              values={[minAge, maxAge]}
              onValuesChange={values => { setMinAge(values[0]); setMaxAge(values[1]); }}
              min={16}
              max={100}
              step={1}
              allowOverlap={false}
              snapped
              minMarkerOverlapDistance={10}
            />
            <Text style={{ color: 'black' }}>{minAge} - {maxAge} years</Text>
          </View>
          {/* Picker for Online Status Selection */}
          <View style={{ borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 5, width: '100%', marginTop: 20 }}>
            <Text style={{ color: 'black' }}>Online Status</Text>
            <Picker
              selectedValue={onlineStatus}
              onValueChange={setOnlineStatus}
              style={{ width: '100%' }}
            >
              <Picker.Item label="Somewhen" value="no filter" style={{ fontSize: 15 }} />
              <Picker.Item label="Online" value="online" style={{ fontSize: 15 }} />
              <Picker.Item label="Recently Online (Today)" value="recentlyOnline" style={{ fontSize: 15 }} />
              <Picker.Item label="Online Last 7 Days" value="onlineLast7Days" style={{ fontSize: 15 }} />
            </Picker>
          </View>
          {/* Picker for Verification Status Selection */}
          <View style={{ borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 5, width: '100%', marginTop: 20 }}>
            <Text style={{ color: 'black' }}>Verification Status</Text>
            <Picker
              selectedValue={verificationStatus}
              onValueChange={setVerificationStatus}
              style={{ width: '100%' }}
            >
              <Picker.Item label="All Users" value="allUsers" style={{ fontSize: 15 }} />
              <Picker.Item label="Verified Users Only" value="verifiedUsers" style={{ fontSize: 15 }} />
            </Picker>
          </View>
          {/* Close Button */}
          <TouchableOpacity onPress={toggleFilter} style={{ marginTop: 20 }}>
            <Text style={styles.textStyle}>Hide</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </BackgroundImage>
  );
  
};

export default HomeScreen;
