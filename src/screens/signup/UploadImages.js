import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Platform,
  Dimensions,
  StatusBar,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import {get, uniqueId, getFilePathFromLocalUri} from '../../infra/utils';
import {Header} from 'react-native-elements';
import I18n from '../../infra/localization';
import ImagePicker from 'react-native-image-crop-picker';
import assetsImages from '../../assets/images';
import UserProfilePictureHeader, {
  WRAPPER_HEIGHT,
  SMALLER_WRAPPER_HEIGHT,
  STRIPE_HEIGHT,
} from './UserProfilePictureHeader';
import {
  isHighDevice,
  isShortDevice,
  isAndroid,
  isIOS,
} from '../../infra/utils/deviceUtils';
import {isNil} from '../../infra/utils';

const MAX_BUTTON_SIZE = 125;
const BUTTONS_MARGIN = 35;
const {width} = Dimensions.get('window');
const BTN_HITSLOP = {left: 10, top: 10, right: 10, bottom: 10};

export default function UploadImages({navigation}) {
  const [screenStateUploading, setScreenStateUploading] = useState(true);
  const [withHeader, setWithHeader] = useState(true);
  const [showModal, setShowModal] = useState();
  const [showError, setShowError] = useState(false);

  const [hideModal, setHideModal] = useState();
  const [
    shouldAvoidAnimateKeyboardShown,
    setShouldAvoidAnimateKeyboardShown,
  ] = useState(null);

  // this.currentProfileImage = get(this.props, 'user.media.thumbnail', '');
  // const source = {uri: this.currentProfileImage};

  const [image, setImage] = useState(null);
  const [iosImage, setIosImage] = useState('');
  const [androidImage, setAndroidImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [images, setImages] = useState(null);
  const hideModalAndAllowKeyboardAnimation = () => {
    setShouldAvoidAnimateKeyboardShown(false);
    setHideModal(true);
  };
  const renderHeaderBtn = () => {
    // console.log(assetsImages);
    const btnText = screenStateUploading
      ? I18n.t('image_upload.cancel_button')
      : I18n.t('image_upload.save_button');
    return (
      <Text
        medium
        color={Colors.azure}
        onPress={handleHeaderBtnClick}
        style={styles.headerBtn}>
        {btnText}
      </Text>
    );
  };

  const handleHeaderBtnClick = () => {};
  const leHeaderBtnClick = () => {
    screenStateUploading ? cancelUploading() : saveFile();
  };
  const cancelUploading = () => {
    // const { activeUploadId } = this.state;
    // const { cancelUpload, onCancel, isScreen } = this.props;
    // if (activeUploadId) {
    //   cancelUpload({ uploadId: activeUploadId });
    // }
    // if (onCancel) {
    //   onCancel(activeUploadId);
    // }
    // if (isScreen) {
    //   navigationService.goBack();
    // }
  };

  const pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        setIosImage(image.sourceURL);
        setAndroidImage(image.path);
        // console.log('received image', image);
        setImage({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
        // console.log('image');

        // console.log(androidImage);
        // console.log('image');
      })
      .catch((e) => {
        console.log(e);
        console.log(e.message ? e.message : e);
      });
  };

  // const setObjectValue = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     // console.log(jsonValue);
  //     await AsyncStorage.setItem('Profile Image Url', jsonValue);
  //     setImage(jsonValue);
  //     // console.log(image);
  //   } catch (e) {
  //     // save error
  //   }

  //   // console.log(image);
  // };

  const renderAsset = (image) => {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return renderVideo(image);
    }

    return renderImage(image);
  };

  const renderImage = (image) => {
    if (iosImage) {
      return (
        <Image
          style={{width: 400, height: 300, resizeMode: 'contain'}}
          source={{uri: iosImage}}
        />
      );
    } else {
      return (
        <Image
          style={{width: 400, height: 300, resizeMode: 'contain'}}
          source={{uri: androidImage}}
        />
      );
    }
  };

  function RenderNextButton() {
    const isDisabled = isNil(image) || isSubmitting;
    const onPress = isDisabled ? () => setShowError(true) : next;
    return <Button title="Next" onPress={onPress} isDisabled={isDisabled} />;
  }

  next = async () => {
    if (androidImage || iosImage) {
      console.log('User upload a profile image');
    } else console.log('User didnt upload a profile image');

    // const { user } = this.props;
    // const { selectedGender: gender } = this.state;
    // const newUserData = { ...user, gender };
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      // this.updateProfile(newUserData);
      await AsyncStorage.setItem('Profile_Image', androidImage || iosImage);
      const dsfdf = await AsyncStorage.getItem('Profile_Image');
      console.log(dsfdf);
      setIsSubmitting(false);
      navigation.navigate('Signup');
    } catch (err) {
      console.error({
        // message: 'failed to submit user gender form',
        // selectedGender,
        err,
      });
    }
    setIsSubmitting(false);
  };
  return (
    <View style={styles.container}>
      {withHeader && (
        <Header
          title={I18n.t('image_upload.header')}
          hasBackButton
          backAction={cancelUploading}
          rightComponent={renderHeaderBtn}
        />
      )}
      {/* <UserProfilePictureHeader
        modalStyle={styles.modalContent}
        showModal={showModal}
        hideModal={hideModalAndAllowKeyboardAnimation}
        isSmaller={!isHighDevice}
      /> */}

      <ScrollView>{image ? renderImage(image) : null}</ScrollView>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => pickSingle(false)}
          style={styles.button}>
          <TouchableOpacity
            activeOpacity={0.75}
            // style={[
            //   this.currentProfileImage
            //     ? styles.editImageButton
            //     : styles.addImageButton,
            // ]}
            onPress={() => pickSingle(false)}
            hitSlop={BTN_HITSLOP}>
            <Text size={14} color={Colors.white} bold center>
              {I18n.t(
                `onboarding.user_profile_header.${
                  image ? 'edit' : 'upload'
                }_button`,
              )}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={[styles.mainPadding]}>{RenderNextButton()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },
  progressText: {
    fontSize: 13,
    marginRight: 15,
  },
  progressBar: {
    flex: 1,
  },
  image: {
    height: '100%',
  },
  headerBtn: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  inlineCancelButton: {
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 5,
  },
});
