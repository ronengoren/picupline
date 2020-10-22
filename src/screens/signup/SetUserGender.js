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
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../../infra/localization';
import {
  misc as miscLocalStorage,
  user as userLocalStorage,
} from '../../infra/localStorage';
import {isNil} from '../../infra/utils';
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

const supportedGender = ['MALE', 'FEMALE'];

export default function SetUserGender({navigation}) {
  const [selectedGender, setSelectedGender] = useState();
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const fieldsOpacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;

  const [showError, setShowError] = useState(false);

  const onChooseGender = (value) => {
    setSelectedGender(value);
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
    const isDisabled = isNil(selectedGender) || this.isSubmitting;
    const onPress = isDisabled ? () => setShowError(true) : this.next;
    return <Button title="Next" onPress={onPress} isDisabled={isDisabled} />;
  }

  next = async () => {
    if (selectedGender == 0) {
      console.log('User Gender is male');
    } else console.log('User Gender is female');

    // const { user } = this.props;
    // const { selectedGender: gender } = this.state;
    // const newUserData = { ...user, gender };
    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    try {
      // this.updateProfile(newUserData);
      await AsyncStorage.setItem('Gender', selectedGender.toString());
      const value = await AsyncStorage.getItem('Gender');
      // console.log('Gender: ' + value);
      this.isSubmitting = false;
      navigation.navigate('SetUserPerf');
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
          {supportedGenders.map((value) => {
            const isActive = selectedGender === value;
            return (
              <TouchableOpacity
                style={[styles.genderCol, isActive && styles.selectedGenderCol]}
                activeOpacity={0.5}
                key={`gender${value}`}
                onPress={() => onChooseGender(value)}>
                <Icon
                  name={
                    value === genderType.MALE
                      ? 'male-outline'
                      : 'female-outline'
                  }
                  type="ionicon"
                  containerStyle={styles.genderIcon}
                  size={50}
                />
                <Text size={18} color={isActive ? Colors.white : Colors.b30}>
                  {value === genderType.MALE ? 'MALE' : 'FEMALE'}
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
          Select Your Gender
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.mainContent,
          {opacity: fieldsOpacity, transform: [{translateY}]},
        ]}>
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
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
    color: 'pink',
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 16,
  },
});
