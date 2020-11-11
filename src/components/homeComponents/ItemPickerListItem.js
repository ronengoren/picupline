import React, {useState, useEffect} from 'react';

import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const ItemPickerListItem = (props) => {
  const [value, setValue] = useState();
  return (
    <TouchableOpacity>
      <View style={styles.itemContainerStyle}>
        <Text style={styles.cityText}>{props.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={[
              value ? styles.textOn : styles.textOff,
              {
                marginRight: 16,
                color: value ? Colors.pinkRed : Colors.white,
              },
            ]}>
            {value ? 'ON' : 'OFF'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemPickerListItem;

const styles = StyleSheet.create({
  city: {
    borderRadius: 20,
    marginRight: 135,
    width: 90,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cityText: {
    fontFamily: Colors.medium,
    color: '#363636',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemContainerStyle: {
    height: 48,
    backgroundColor: 'black',
    marginLeft: 16,
    marginRight: 16,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
    borderBottomColor: Colors.darkGray,
  },
  title: {
    fontSize: 14,
    color: 'white',
  },

  textOn: {
    fontSize: 14,
    color: Colors.red,
  },
  textOff: {
    fontSize: 14,
    color: Colors.white,
  },
});
