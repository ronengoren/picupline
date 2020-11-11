import React from 'react';

import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const UserSearchView = () => {
  return (
    <TouchableOpacity style={styles.city}>
      <Text style={styles.cityText}>
        <Icon name="md-pin" size={15} /> Search your city...
      </Text>
    </TouchableOpacity>
  );
};

export default UserSearchView;

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
});
