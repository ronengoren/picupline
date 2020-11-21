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
import Amplify, {Analytics} from 'aws-amplify';
import config from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';

Amplify.configure(
  config,
  (Analytics: {
    disabled: true,
  }),
);

export default class App extends React.Component {
  render() {
    return <Providers />;
  }
}
