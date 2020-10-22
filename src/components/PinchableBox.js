import React from 'react';
import {Animated, Dimensions, View, Text, StyleSheet} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {Image} from 'react-native-elements';

const {width, height} = Dimensions.get('screen');

const PinchableBox = ({imageUri}) => {
  let scale = new Animated.Value(1);

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
        source={{uri: imageUri}}
        resizeMode="contain"
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
