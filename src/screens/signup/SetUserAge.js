import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native'; // eslint-disable-line react-native/split-platform-components
import I18n from '../../infra/localization';
import DateTimePicker from '@react-native-community/datetimepicker';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../constants/Colors';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-community/picker';
import {
  translateDate,
  getISOStringDateOnly,
} from '../../infra/utils/dateTimeUtils';

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

export default function SetUserAge({navigation, route}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onSave = async (value) => {
    const dataToSave = {};
    const newDate = getISOStringDateOnly(date);
    try {
      await AsyncStorage.setItem('DOB', newDate);
      navigation.navigate('SetUserGender');
    } catch (e) {
      // save error
    }

    console.log('Done.');
  };

  //   const getData = async () => {
  //     try {
  //       const value = await AsyncStorage.multiGet(['Gender', 'Preferred Gender']);
  //       // console.log(value);
  //       if (value !== null) {
  //         // value previously stored
  //       }
  //     } catch (e) {
  //       // error reading value
  //     }
  //   };
  useEffect(() => {
    // getData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.upperPart}>
        <Text style={styles.header}>What's your Date of Birth?</Text>
        <View>
          <View>
            <TouchableOpacity
              style={styles.dateText}
              onPress={showDatepicker}
              title="Show date picker!">
              <Text style={styles.dateText}>{translateDate(date)}</Text>
            </TouchableOpacity>
            <View style={styles.dateBottomLine} />
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={{width: 250}}
            />
          )}
        </View>
        {/* <View style={styles.seperator} /> */}
      </View>
      <View style={styles.lowerPart}>
        <Button title="save" footerButton size="huge" onPress={onSave} />
      </View>
    </View>
  );
}

//   <Button
//           title="SetUserGender"
//           onPress={() => navigation.navigate('SetUserGender')}
//           style={{marginTop: 30}}></Button>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fillGrey,
  },
  upperPart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  header: {
    height: 20,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: Colors.medium,
    // fontWeight: homeisFontWeights.medium,
    fontSize: 20,
    lineHeight: 20,
    color: Colors.black,
  },
  subHeader: {
    height: 20,
    fontFamily: Colors.medium,
    // fontWeight: homeisFontWeights.medium,
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: Colors.placeholderGrey,
  },
  dateText: {
    maxWidth: 335,
    height: 30,
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    color: Colors.black,
  },
  dateBottomLine: {
    width: '100%',
    maxWidth: 335,
    height: 2,
    backgroundColor: Colors.green,
  },
  lowerPart: {
    width: '100%',
    height: 280,
    backgroundColor: Colors.white,
  },
  toggleLine: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.disabledGrey,
    borderBottomWidth: 1,
  },
  toggleLineText: {
    height: 22,
    // fontFamily: homeisFonts.medium,
    // fontWeight: homeisFontWeights.medium,
    fontSize: 15,
    lineHeight: 22.0,
    color: Colors.black,
  },
  seperator: {
    height: 10,
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.b90,
    backgroundColor: Colors.fillGrey,
  },
});
