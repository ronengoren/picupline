import React, {useState, useEffect} from 'react';

import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import ListItem from './ListItem';
import {Picker} from '@react-native-community/picker';

const NumberRangePickerListItem = (props) => {
  const [value, setValue] = useState();
  const [text, setText] = useState(
    props.fromValue != null && props.toValue != null
      ? props.fromValue + '-' + props.toValue
      : '',
  );
  const [min, setMin] = useState(props.min);
  const [max, setMax] = useState(props.min);

  console.log(text);

  openPicker = () => {
    let fromData = [];
    for (let i = min; i < max; i++) {
      fromData.push(i);
    }
    let toData = [];
    for (let i = min; i < max; i++) {
      toData.push(i);
    }
    let data = [fromData, toData];

    Picker.init({
      pickerData: data,
      selectedValue: [fromValue || min, toValue || max],
      onPickerConfirm: (data) => {},
      onPickerCancel: (data) => {},
      onPickerSelect: (data) => {
        this.setState({text: data[0] + '-' + data[1]});
        if (props.onPickRange) {
          props.onPickRange(data[0], data[1]);
        }
      },
      pickerConfirmBtnText: 'Done',
      pickerCancelBtnText: '',
      pickerTitleText: '',
    });
    Picker.show();
  };
  return (
    <ListItem
      text={text}
      {...this.props}
      onItemPress={() => {
        console.log('onItemPress');
        openPicker();
      }}
    />
  );
};

export default NumberRangePickerListItem;
