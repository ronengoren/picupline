import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
  Button,
  Animated,
  Image,
} from 'react-native'; // eslint-disable-line react-native/split-platform-components
import I18n from '../../infra/localization';

import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-community/picker';
import {
  translateDate,
  getISOStringDateOnly,
} from '../../infra/utils/dateTimeUtils';
// import {Image} from '../../components/basicComponents/Image';
import images from '../../assets/images';
import videos from '../../assets/videos';

import {uiConstants} from '../../vars/uiConstants';
import {get, random} from '../../infra/utils';
import UserAvatarImageSwitcher from './UserAvatarImageSwitcher';

const SWITCHING_IMAGES_ANIMATION_DURATION = 250;
const DELAY_BEFORE_SHOWING_GREETING = 1000;
const DELAY_BEFORE_HIDING_GREETING = 3000;

export const WRAPPER_HEIGHT = 400;
export const SMALLER_WRAPPER_HEIGHT = 260;
export const STRIPE_HEIGHT = 42;
const NUM_OF_GREETING_VIDEOS =
  videos.onboarding.profile_photo_greetings.length - 1;

const BTN_HITSLOP = {left: 10, top: 10, right: 10, bottom: 10};
const {width} = Dimensions.get('screen');

export default function UserProfilePictureHeader({navigation, route}) {
  return (
    <View style={[styles.wrapper, styles.smallerWrapper]}>
      <Text>UserProfilePictureHeader</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.b97,
    height: WRAPPER_HEIGHT,
  },
  smallerWrapper: {
    height: SMALLER_WRAPPER_HEIGHT,
  },
  profileImageWrapper: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },
  userImage: {
    height: '100%',
    width,
    borderColor: Colors.white,
  },
  addImageButton: {
    minWidth: 140,
    height: 35,
    borderRadius: 10,
    backgroundColor: Colors.green,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 21,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    minWidth: 60,
    paddingHorizontal: 8,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteStripe: {
    position: 'absolute',
    bottom: -2,
    width: '100%',
    height: STRIPE_HEIGHT,
  },
  video: {
    width: 180,
    height: 110,
    marginBottom: 15,
    marginTop: -STRIPE_HEIGHT,
    marginLeft: -15,
  },
  greetingVideoWrapper: {
    position: 'absolute',
    right: 0,
    width: 166,
    height: 50,
    bottom: 0,
    transform: [
      {translateX: -(width / 2 - 130)},
      {translateY: 30},
      {rotate: '12deg'},
    ],
    zIndex: 6,
  },
  greetingVideo: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imageUploadModal: {
    maxHeight: uiConstants.FOOTER_MARGIN_BOTTOM_ONBOARDING + 40,
  },
  imageUploadWrapper: {
    marginHorizontal: 15,
  },
});
