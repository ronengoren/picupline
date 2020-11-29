/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import I18n from './src/infra/localization';
import 'react-native-gesture-handler';

I18n.init();
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  'Warning: componentWillReceiveProps',
  'RCTRootView cancelTouches',
  'not authenticated',
  'Sending `onAnimatedValueUpdate`',
  'Task orphaned',
  'No credentials, applicationId or region',
  'Require cycle:',
]);
AppRegistry.registerComponent(appName, () => App);
