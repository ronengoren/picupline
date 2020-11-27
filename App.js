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
import Providers from './src/navigation';
import Amplify, {Analytics, Auth, API, graphqlOperation} from 'aws-amplify';
import config from './aws-exports';
import * as Keychain from 'react-native-keychain';
import {AmplifyProvider} from 'aws-amplify-react-hooks';
import {useColorScheme} from 'react-native-appearance';

const client = {
  Auth,
  API,
  graphqlOperation,
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

const App = () => {
  return (
    <>
      <AmplifyProvider client={client}>
        <Providers />
      </AmplifyProvider>
    </>
  );
};

export default App;
