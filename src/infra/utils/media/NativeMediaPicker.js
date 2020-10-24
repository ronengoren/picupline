import ImagePicker from 'react-native-image-crop-picker';
import {Alert} from 'react-native';
import I18n from '../../localization';
import {get} from '../../utils';
import Colors from '../../../constants/Colors';

const mediaTypes = {
  IMAGE: 'image',
  VIDEO: 'video',
};

const mediaSourceTypes = {
  GALLERY: 'gallery',
  CAMERA: 'camera',
  UNSPLASH: 'unsplash',
  FACEBOOK: 'facebook',
};
const mapMediaTypes = {
  image: 'photo',
  video: 'video',
  any: 'any',
};
const errorCodes = {
  USER_CANCELLED: 'E_PICKER_CANCELLED',
  NO_PHOTO_LIBRARY_PERMISSIONS: 'E_PERMISSION_MISSING',
};

class NativeMediaPicker {
  static show({
    mediaType,
    options,
    withFacebook,
    withUnsplash,
    entityType,
    onDelete,
  }) {
    return new Promise((resolve, reject) => {
      const onCancel = () => resolve();
      const onPickerChosen = () => {
        setTimeout(
          () =>
            NativeMediaPicker.openPicker({mediaType, options, entityType})
              .then(resolve)
              .catch(reject),
          1000,
        );
      };
      const onCameraChosen = () => {
        setTimeout(
          () =>
            NativeMediaPicker.openCamera({mediaType, entityType})
              .then(resolve)
              .catch(reject),
          1000,
        );
      };
      //   const onFacebookChosen = () => {
      //     setTimeout(() => {
      //       NativeMediaPicker.getFacebookImage({ mediaType, entityType })
      //         .then(resolve)
      //         .catch(reject);
      //     }, 1000);
      //   };
      //   const onUnsplashChosen = () => {
      //     NativeMediaPicker.getOutsourceMediaImage({ source: mediaSourceTypes.UNSPLASH, entityType })
      //       .then(resolve)
      //       .catch(reject);
      //   };

      NativeMediaPicker._showActionSheet({
        mediaType,
        withFacebook,
        withUnsplash,
        onCancel,
        onPickerChosen,
        onCameraChosen,
        onFacebookChosen,
        onUnsplashChosen,
        onDelete,
      });
    });
  }

  //   static _showActionSheet({ mediaType, withFacebook, withUnsplash, onCancel, onPickerChosen, onCameraChosen, onFacebookChosen, onUnsplashChosen, onDelete }) {
  //     const actionSheetDefinitions = NativeMediaPicker.getActionSheetDefinitions({
  //       mediaType,
  //       withFacebook,
  //       withUnsplash,
  //       onCancel,
  //       onPickerChosen,
  //       onCameraChosen,
  //       onFacebookChosen,
  //       onUnsplashChosen,
  //       onDelete
  //     });
  //     global.store.dispatch(openActionSheet(actionSheetDefinitions));
  //   }

  static getActionSheetDefinitions({
    mediaType,
    withFacebook,
    withUnsplash,
    onCancel,
    onPickerChosen,
    onCameraChosen,
    onFacebookChosen,
    onUnsplashChosen,
    onDelete,
  }) {
    const definitions = {
      options: [
        {
          id: 'camera',
          text:
            mediaType === mediaTypes.VIDEO
              ? I18n.t('image_picker.options.video_camera')
              : I18n.t('image_picker.options.image_camera'),
          shouldClose: true,
          action: onCameraChosen,
        },
        {
          id: 'picker',
          text: I18n.t('image_picker.options.gallery'),
          shouldClose: true,
          action: onPickerChosen,
        },
      ],
      hasCancelButton: true,
      onCancel,
    };

    if (withFacebook) {
      definitions.options.unshift({
        id: 'facebook',
        text: I18n.t('image_picker.options.facebook'),
        shouldClose: true,
        action: onFacebookChosen,
      });
    }

    if (withUnsplash && mediaType === mediaTypes.IMAGE) {
      definitions.options.unshift({
        id: 'unsplash',
        text: I18n.t('image_picker.options.unsplash'),
        shouldClose: true,
        action: onUnsplashChosen,
      });
    }

    if (onDelete) {
      definitions.options.push({
        id: 'delete',
        text: I18n.t('image_picker.options.delete'),
        shouldClose: true,
        color: Colors.red,
        action: onDelete,
      });
    }

    return definitions;
  }

  static openPicker({mediaType, options = {}, entityType}) {
    return new Promise((resolve, reject) => {
      ImagePicker.openPicker({
        mediaType: mapMediaTypes[mediaType] || mapMediaTypes.any,
        compressImageQuality: 0.8,
        compressImageMaxWidth: 2048,
        compressImageMaxHeight: 2048,
        multiple: options.maxFiles > 1,
        maxFiles: options.maxFiles || 5,
        smartAlbums: ['RecentlyAdded', 'Favorites', 'UserLibrary'],
        ...options,
      })
        .then((res) => {
          if (Array.isArray(res)) {
            const medias = res.map((media) => ({
              localUri: media.path,
              fileName: NativeMediaPicker._getFileName(media.path, media.mime),
              mediaType,
            }));
            resolve(medias);
          } else {
            const media = {
              localUri: res.path,
              fileName: NativeMediaPicker._getFileName(res.path, res.mime),
              mediaType,
            };
            options.multiple ? resolve([media]) : resolve(media);
          }
        })
        .catch((err) => {
          switch (err.code) {
            case errorCodes.USER_CANCELLED:
              resolve();
              break;
            case errorCodes.NO_PHOTO_LIBRARY_PERMISSIONS:
              Alert.alert(
                I18n.t('image_picker.permission_error.header'),
                I18n.t('image_picker.permission_error.body'),
                [{text: I18n.t('image_picker.permission_error.button')}],
              );
              // TODO: add opensettings lib (https://github.com/yonahforst/react-native-permissions)
              resolve();
              break;
            default:
              reject(err);
          }
        });
    });
  }

  static openCamera({mediaType, options = {}, entityType}) {
    return new Promise((resolve, reject) => {
      ImagePicker.openCamera({
        mediaType: mapMediaTypes[mediaType],
        width: 300,
        height: 400,
        ...options,
      })
        .then(({path}) => {
          const media = {
            localUri: path,
            fileName: NativeMediaPicker._getFileName(path),
            mediaType,
          };
          options.multiple ? resolve([media]) : resolve(media);
        })
        .catch((err) => {
          switch (err.code) {
            case errorCodes.USER_CANCELLED:
              resolve();
              break;
            case errorCodes.NO_PHOTO_LIBRARY_PERMISSIONS:
              Alert.alert(
                I18n.t('image_picker.permission_error.header'),
                I18n.t('image_picker.permission_error.body'),
                [{text: I18n.t('image_picker.permission_error.button')}],
              );
              // TODO: add opensettings lib (https://github.com/yonahforst/react-native-permissions)
              resolve();
              break;
            default:
              reject(err);
          }
        });
    });
  }

  //   static getFacebookImage({ mediaType, entityType }) {
  //     return new Promise((resolve, reject) => {
  //       const getImage = async () => {
  //         try {
  //           const result = await facebookLogin(['public_profile', 'email', 'user_friends', 'user_hometown', 'user_location', 'user_gender']);
  //           if (!result.isCancelled) {
  //             const { accessToken } = await AccessToken.getCurrentAccessToken();
  //             const { data } = await global.store.dispatch(
  //               apiQuery({
  //                 query: {
  //                   domain: 'auth',
  //                   key: 'getFacebookProfileImage',
  //                   params: {
  //                     accessToken: accessToken.toString()
  //                   }
  //                 }
  //               })
  //             );
  //             const path = get(data, 'data.url');
  //             const media = { remoteUri: path, fileName: NativeMediaPicker._getFileName(path), mediaType };
  //             resolve(media);
  //           }
  //         } catch (error) {
  //           reject(error);
  //         }
  //       };

  //       getImage();
  //     });
  //   }

  //   static getOutsourceMediaImage({ source, entityType }) {
  //     return new Promise((resolve, reject) => {
  //       try {
  //         global.store.dispatch(
  //           showOutsourceMediaPickerModal({
  //             entityType,
  //             source,
  //             onMediaSelect: ({ thumbnailUri, mediaUrl, extraInfo }) => {
  //               resolve({ thumbnailUri, remoteUri: mediaUrl, mediaType: mediaTypes.IMAGE, extraInfo });
  //             }
  //           })
  //         );
  //       } catch (error) {
  //         console.log({ message: `OutsourceMediaImagePickerModal failed to show, source ${source}`, error });
  //         reject(error);
  //       }
  //     });
  //   }

  static _getFileName(path, mime) {
    const suggestedFileName = path.split('/').pop();
    // this workaround for gif works only for iOS, android returns mime of image/jpeg unfortunately. will have to wait for a fix in the library to solve both in a proper way.
    if (mime && mime.includes('gif')) {
      return suggestedFileName.endsWith('.jpg')
        ? suggestedFileName.replace('.jpg', '.gif')
        : `${suggestedFileName}.gif`;
    }
    return suggestedFileName;
  }
}

export default NativeMediaPicker;
