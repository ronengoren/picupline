/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
LogBox.ignoreLogs(['Task orphaned']);
AppRegistry.registerComponent(appName, () => App);
