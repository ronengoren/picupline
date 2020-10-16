import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
// import MainTabNavigator from './src/navigation';
import {MainTabNavigator} from './src/navigation/';
import Providers from './src/navigation';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  render() {
    return <Providers />;
  }
}
