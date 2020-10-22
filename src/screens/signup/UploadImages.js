import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  Platform,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../constants/Colors';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const MAX_BUTTON_SIZE = 125;
const BUTTONS_MARGIN = 35;
const BUTTONS_SIZE = (Dimensions.get('window').width - BUTTONS_MARGIN * 3) / 2;

const genderType = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
  UNKNOWN: 3,
};

const supportedGenders = [genderType.MALE, genderType.FEMALE];

export default function UploadImages({navigation, route}) {
  const getData = async () => {
    try {
      const value = await AsyncStorage.multiGet(['Gender', 'Preferred Gender']);
      console.log(value);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.wrapperShortDevice}>
      <StatusBar translucent={false} barStyle="dark-content" />
      <View>
        <Text>UploadImages</Text>
        <Button
          title="email signup"
          onPress={() => navigation.navigate('Signup')}
          style={{marginTop: 30}}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperShortDevice: {
    paddingTop: 110,
  },
  media: {
    marginTop: 7,
  },
  mainContent: {
    flex: 1,
  },
  mainPadding: {
    marginHorizontal: 15,
  },
  genderCol: {
    maxWidth: MAX_BUTTON_SIZE,
    maxHeight: MAX_BUTTON_SIZE,
    width: BUTTONS_SIZE,
    height: BUTTONS_SIZE,
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 2,
    borderColor: Colors.lightPaleGrey,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  genderSelectors: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingTop: 11,
  },
  genderHeaderTitle: {
    fontSize: 32,
    lineHeight: 35,
    textAlign: 'center',
    marginBottom: 10,
  },
  genderHeader: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 42,
  },
  selectedGenderCol: {
    backgroundColor: Colors.green,
    borderWidth: 0,
  },
});
