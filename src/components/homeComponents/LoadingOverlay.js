import React, {useState, useEffect} from 'react';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const LoadingOverlay = (props) => {
  //   console.log(props);
  const {visible} = props;

  if (!visible) {
    null;
  }
  return (
    <View style={styles.background}>
      <ActivityIndicator animating={true} size="large" color="#fff" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
