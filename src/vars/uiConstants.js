import {Platform, StatusBar} from 'react-native';
import {hasNotch} from '../infra/utils/deviceUtils';

const androidStatusBarHeight = 20;

const getAndroidStatusBarDiff = () =>
  StatusBar.currentHeight - androidStatusBarHeight;

const FOOTER_MARGIN_BOTTOM = hasNotch({calculatePunchHole: false}) ? 20 : 0;
const PHONE_BAR_HEIGHT_TRANSLUCENT = Platform.select({
  ios: hasNotch() ? 35 : 20,
  android: hasNotch() ? getAndroidStatusBarDiff() + 20 : 20,
});

const uiConstants = {
  STATUS_BAR_HEIGHT: Platform.select({
    ios: hasNotch() ? 45 : 30,
    android: hasNotch() ? getAndroidStatusBarDiff() + 40 : 30,
  }),
  NAVBAR_HEIGHT: Platform.select({
    ios: hasNotch() ? 97 : 82,
    android: hasNotch() ? getAndroidStatusBarDiff() + 82 : 82,
  }),
  NAVBAR_TOP_MARGIN: Platform.select({
    ios: hasNotch() ? 15 : 0,
    android: hasNotch() ? getAndroidStatusBarDiff() : 0,
  }),
  PHONE_BAR_HEIGHT: Platform.select({
    ios: hasNotch() ? 35 : 20,
    android: hasNotch() ? getAndroidStatusBarDiff() : 0,
  }),
  PHONE_BAR_HEIGHT_TRANSLUCENT,
  HEADER_BUTTONS_TOP: PHONE_BAR_HEIGHT_TRANSLUCENT + 10,
  SUBMIT_BTN_HEIGHT: 60,
  WIDE_SCREEN_DEVICE_WIDTH: 375,
  NORMAL_DEVICE_HEIGHT: 568,
  SMALL_DEVICE_HEIGHT: 480,
  BTN_HITSLOP: {left: 5, top: 5, right: 5, bottom: 5},
  BTN_HITSLOP_15: {left: 15, top: 15, right: 15, bottom: 15},
  BOTTOM_TAB_BAR_HEIGHT: 55,
  FOOTER_MARGIN_BOTTOM,
  FOOTER_MARGIN_BOTTOM_ONBOARDING: FOOTER_MARGIN_BOTTOM + 15,
  FOOTER_MARGIN_BOTTOM_TAB_BAR: FOOTER_MARGIN_BOTTOM + 10,
  HEADER_HEIGHT: 60,
};

export {uiConstants}; // eslint-disable-line import/prefer-default-export
