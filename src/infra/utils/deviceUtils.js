import DeviceInfo from 'react-native-device-info';
import KeepAwake from 'react-native-keep-awake';
import {Dimensions, Platform, NativeModules} from 'react-native';
import {get} from '../utils';
import * as RNLocalize from 'react-native-localize';

const deviceTypes = {
  // synced with database enum
  IOS: 'iOS',
  ANDROID: 'android',
  UNKNOWN: 'unknown',
};

// const bitriseBuildVersion = process.env.BITRISE_BUILD_NUMBER;
const SAMSUNG_PUNCHHOLES_MODELS = [
  'SM-G97',
  'SM-N97',
  'SM-A205',
  'SM-A305',
  'SM-A307',
  'SM-A405',
  'SM-A606',
  'SM-A505',
  'SM-A307',
  'SM-A705',
  'SM-M405',
];
const NEW_DEVICE_IDS_WITH_NOTCH = ['iPhone12,1', 'iPhone12,3', 'iPhone12,5'];
const DEVICE_BIG_HEIGHT_MIN_VALUE = 800;
const DEVICE_SMALL_HEIGHT_MAX_VALUE = 568;

export const isHighDevice =
  Dimensions.get('screen').height >= DEVICE_BIG_HEIGHT_MIN_VALUE;

export const isShortDevice =
  Dimensions.get('screen').height <= DEVICE_SMALL_HEIGHT_MAX_VALUE;

export function getDeviceType() {
  return Platform.select({
    ios: deviceTypes.IOS,
    android: deviceTypes.ANDROID,
  });
}

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export function getVersionNumber() {
  return DeviceInfo.getVersion();
}

// export function getVersionBuildNumber() {
//   return bitriseBuildVersion || getVersionNumber().buildVersion;
// }

export function getDeviceInfo() {
  return DeviceInfo;
}

export function getDeviceLang() {
  return Platform.OS === 'ios'
    ? get(NativeModules, 'SettingsManager.settings.AppleLocale') ||
        get(NativeModules, 'SettingsManager.settings.AppleLanguages[0]')
    : get(NativeModules, 'I18nManager.localeIdentifier');
}

export function getDeviceLocales() {
  return RNLocalize.getLocales().map((locale) => locale.languageTag);
}

export function getDeviceUUID() {
  return DeviceInfo.getUniqueId();
}

export function getDeviceBrand() {
  return DeviceInfo.getBrand();
}

export function getDeviceModel() {
  return DeviceInfo.getModel();
}

export function hasNotch({calculatePunchHole = true} = {}) {
  const deviceId = DeviceInfo.getDeviceId();
  return (
    NEW_DEVICE_IDS_WITH_NOTCH.includes(deviceId) ||
    DeviceInfo.hasNotch() ||
    (calculatePunchHole && hasPunchHole())
  );
}

export function hasPunchHole() {
  const deviceModels = [...SAMSUNG_PUNCHHOLES_MODELS];
  const deviceModel = getDeviceModel();
  const isDeviceHasPunchHole = deviceModels.some((modelRegex) =>
    new RegExp(modelRegex, 'ig').test(deviceModel),
  );
  return isDeviceHasPunchHole;
}

export function keepDeviceAwake() {
  KeepAwake.activate();
}

export function allowDeviceToSleep() {
  KeepAwake.deactivate();
}

export function getDeviceInfoForRegistration() {
  const versionNumber = getVersionNumber();
  const osVersion = DeviceInfo.getSystemVersion();
  return {
    deviceId: getDeviceUUID(),
    deviceType: getDeviceType(),
    deviceVersion: osVersion,
    appVersion: versionNumber,
    // appBuildNumber: getVersionBuildNumber(),
  };
}
