import React from 'react';

import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const CardItem = ({
  image,
  name,
  status,
  //variant
}) => {
  // Custom styling
  //const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 10,
      height: 180,
      width: 155,
      alignItems: 'center',
    },
  ];

  const nameStyle = [
    {
      paddingTop: 10,
      color: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: Colors.medium,
    },
  ];

  return (
    <View style={styles.containerCardItem2}>
      {/* IMAGE */}
      <Image source={{uri: image}} style={imageStyle} />

      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>

      {/* STATUS */}
      {status && (
        <View style={styles.status}>
          <View style={status === 'Online' ? styles.online : styles.offline} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardItem2: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 20,
    height: 260,
    width: 165,
    marginRight: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#757E90',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
export default CardItem;
