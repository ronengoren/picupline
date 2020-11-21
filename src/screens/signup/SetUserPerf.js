import React, {useState, useEffect, useRef} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {isNil} from '../../infra/utils';

const MAX_BUTTON_SIZE = 125;
const BUTTONS_MARGIN = 35;
const BUTTONS_SIZE = (Dimensions.get('window').width - BUTTONS_MARGIN * 3) / 2;

const preferredGenderType = {
  MALE: 0,
  FEMALE: 1,
  BOTH: 2,
  UNKNOWN: 3,
};

const supportedPreferredGenders = [
  preferredGenderType.MALE,
  preferredGenderType.FEMALE,
  preferredGenderType.BOTH,
];

export default function SetUserPerf({navigation}) {
  const [preferredGender, setPreferredGender] = useState();
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const fieldsOpacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;

  const [showError, setShowError] = useState(false);

  const onChoosePreferredGender = (value) => {
    setPreferredGender(value);
  };

  const animateContentFields = () => {
    Animated.parallel([
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 750,
        delay: 750,
        useNativeDriver: true,
      }),
      Animated.timing(fieldsOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 750,
        useNativeDriver: true,
      }),
    ]).start();
  };

  function RenderNextButton() {
    const isDisabled = isNil(preferredGender) || this.isSubmitting;
    const onPress = isDisabled ? () => setShowError(true) : this.next;
    return <Button title="Next" onPress={onPress} isDisabled={isDisabled} />;
  }

  next = async () => {
    if (preferredGender == 0) {
      console.log('User Prefer male');
    } else if (preferredGender == 1) {
      console.log('User Prefer female');
    } else {
      console.log('User Prefer both genders');
    }
    // const { user } = this.props;
    // const { selectedGender: gender } = this.state;
    // const newUserData = { ...user, gender };
    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    try {
      // this.updateProfile(newUserData);
      await AsyncStorage.setItem(
        'Preferred Gender',
        preferredGender.toString(),
      );
      const value = await AsyncStorage.getItem('Preferred Gender');
      // console.log('Gender: ' + value);
      this.isSubmitting = false;
      navigation.navigate('UploadImages');
    } catch (err) {
      console.error({
        // message: 'failed to submit user gender form',
        // selectedGender,
        err,
      });
    }
    this.isSubmitting = false;
  };

  function RenderGenderField() {
    return (
      <View style={{marginTop: 80, alignItems: 'center'}}>
        <View style={styles.genderSelectors}>
          {supportedPreferredGenders.map((value) => {
            const isActive = preferredGender === value;
            return (
              <TouchableOpacity
                style={[styles.genderCol, isActive && styles.selectedGenderCol]}
                activeOpacity={0.5}
                key={`gender${value}`}
                onPress={() => onChoosePreferredGender(value)}>
                <Icon
                  name={
                    value === preferredGenderType.MALE
                      ? 'male-outline'
                      : value === preferredGenderType.FEMALE
                      ? 'female-outline'
                      : value === preferredGenderType.BOTH
                      ? 'male-female-outline'
                      : null
                  }
                  type="ionicon"
                  containerStyle={styles.genderIcon}
                  size={50}
                />
                <Text size={18} color={isActive ? Colors.white : Colors.b30}>
                  {value === preferredGenderType.MALE
                    ? 'MALE'
                    : value === preferredGenderType.FEMALE
                    ? 'FEMALE'
                    : value === preferredGenderType.BOTH
                    ? 'BOTH'
                    : null}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  useEffect(() => {
    animateContentFields();
  }, []);

  return (
    <View style={styles.wrapperShortDevice}>
      <StatusBar translucent={false} barStyle="dark-content" />

      <Animated.View style={[{opacity: bgOpacity}]}>
        <Text style={styles.genderHeaderTitle} bolder>
          Select Your Preferred Gender
        </Text>
      </Animated.View>
      <Animated.View style={[styles.mainContent]}>
        <RenderGenderField></RenderGenderField>
      </Animated.View>
      <View style={[styles.mainPadding]}>{RenderNextButton()}</View>
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
