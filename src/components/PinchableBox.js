import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, View, Text, StyleSheet} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {Image} from 'react-native-elements';
import storage from '@react-native-firebase/storage';

const {width, height} = Dimensions.get('screen');

const PinchableBox = ({imageUri, route}) => {
  const [images, setImages] = useState(null);

  React.useEffect(() => {
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    // console.log(filename);

    const reference = storage().ref('profileImages' + '/' + filename);
    reference
      .getDownloadURL()
      .then((url) => {
        // console.log('images');

        // console.log(url);
        // console.log('images');
        //from url you can fetched the uploaded image easily
        setImages({uri: url});
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));

    // if (route.params?.avatar) {
    //   // console.log(route.params);
    //   setAvatar(route.params.avatar);
    //   // console.log(avatar);
    //   // Post updated, do something with `route.params.post`
    //   // For example, send the post to the server
    // }
  }, []);

  let scale = new Animated.Value(1);
  // console.log(imageUri);
  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: {scale: scale},
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };
  // console.log('imageUri');
  // console.log(imageUri);
  // console.log('imageUri');

  // console.log(Image.resolveAssetSource(imageUri));

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchEvent}
      onHandlerStateChange={onPinchStateChange}>
      <Animated.Image
        style={{
          width: width,
          height: 300,
          transform: [{scale: scale}],
        }}
        source={images}
        resizeMode="cover"
      />
    </PinchGestureHandler>
  );
};

export default PinchableBox;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pinchableImage: {
    width: 250,
    height: 250,
  },
  wrapper: {
    flex: 1,
  },
});
