import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const TopNavigatorView = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {props.title && <Text style={styles.title}>{props.title}</Text>}
      </View>
      <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
        <TouchableOpacity>
          <View style={styles.backContainer}>
            <Icon name={'md-swap-horizontal'} color={'white'} size={30} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {props.leftComponent || <View style={{width: 50, height: 50}} />}
          {props.rightComponent || <View style={{width: 50, height: 50}} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default TopNavigatorView;
