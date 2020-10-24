/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import I18n from './src/infra/localization';
import 'react-native-gesture-handler';

I18n.init();

LogBox.ignoreLogs(['Task orphaned']);
AppRegistry.registerComponent(appName, () => App);
