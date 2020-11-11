import React from 'react';

import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const Filters = (props) => {
  console.log(props);
  return (
    <TouchableOpacity style={styles.filters}>
      <Text style={styles.filtersText}>
        <Icon name="md-funnel" size={15} /> Filters
      </Text>
    </TouchableOpacity>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filters: {
    padding: 5,
    borderRadius: 20,
    width: 70,
    marginLeft: 30,
  },
  filtersText: {
    fontFamily: Colors.medium,
    color: '#363636',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
