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
import Providers from './navigation';
import Amplify, {
  Analytics,
  Auth,
  API,
  graphqlOperation,
  Storage,
} from 'aws-amplify';
import config from '../aws-exports';
import * as Keychain from 'react-native-keychain';
import {AmplifyProvider} from 'aws-amplify-react-hooks';
import {useColorScheme} from 'react-native-appearance';

const client = {
  Auth,
  API,
  graphqlOperation,
  Storage,
};

AmplifyProvider(client);
const MEMORY_KEY_PREFIX = '@MyStorage:';
let dataMemory = {};

class MyStorage {
  static syncPromise = null;

  static setItem(key, value) {
    Keychain.setGenericPassword(MEMORY_KEY_PREFIX + key, value);
    dataMemory[key] = value;
    return dataMemory[key];
  }

  static getItem(key) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key)
      ? dataMemory[key]
      : undefined;
  }

  static removeItem(key) {
    Keychain.resetGenericPassword();
    return delete dataMemory[key];
  }

  static clear() {
    dataMemory = {};
    return dataMemory;
  }
}
Amplify.configure({
  ...config,
  Analytics: {
    disabled: false,
  },
  storage: MyStorage,
});
Storage.configure({
  ...config,
});
const App = () => {
  return (
    <>
      <AmplifyProvider client={client}>
        <StatusBar barStyle="dark-content" />
        <Providers />
      </AmplifyProvider>
    </>
  );
};

export default App;
