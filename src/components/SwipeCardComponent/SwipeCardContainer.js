import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SwipeCard from './SwipeCard';
import React, {useEffect, useRef, useState} from 'react';
import Draggable from 'react-native-draggable';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SwipeCardContainer = (props) => {
  // props.usersThreads.map((item, i) => {
  //   console.log(item.uri, i);
  // });
  // get user screen height
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  // get user screen width
  const SCREEN_WIDTH = Dimensions.get('window').width;
  //to change images
  const [numberOfImage, setNumberOfImage] = useState(0);
  const [like, setLike] = useState(null);
  // to change user when you're swipe
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = auth().currentUser;

  const pan = useRef(new Animated.ValueXY()).current;
  //interpolates the card value before updating the property
  let rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
  //converts {x, y} into a useable translation transform
  let rorateAndTraslate = {
    transform: [{rotate: rotate}, ...pan.getTranslateTransform()],
  };
  //interpolates the likePhoto value before updating the property
  const likeOpacity = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  function Match(params) {
    console.log(params);
  }
  //interpolates the dislikePhoto value before updating the property
  const dislikeOpacity = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  //interpolates the next cartd value before updating the property
  const nextCardOpacity = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });
  //appearance of the next card
  const nextCardScale = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        pan.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(pan, {
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex((prevCount) => prevCount + 1);
            setNumberOfImage(0);
            pan.setValue({x: 0, y: 0});
          });
          const object = Object.values(evt._targetInst.memoizedProps.children);
          // const likeArray = [];
          // likeArray.push(object[4].user);
          // setLike(object[4].user);
          onLike(object[4].user);
        } else if (gestureState.dx < -120) {
          Animated.spring(pan, {
            toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex((prevCount) => prevCount + 1);
            setNumberOfImage(0);
            pan.setValue({x: 0, y: 0});
          });
        } else {
          Animated.spring(
            pan, // Auto-multiplexed
            {toValue: {x: 0, y: 0}, useNativeDriver: false}, // Back to zero
          ).start();
        }
      },
    }),
  ).current;

  async function onLike(data) {
    console.log(data);
    console.log(currentUser.uid);
    const updateRef = firestore()
      .collection('Users')
      .doc(currentUser.uid)
      .update({
        likes: firestore.FieldValue.arrayUnion(data),
      });
    // navigation.goBack();
    // setLoading(true);
  }
  const renderUsers = () => {
    return props.usersThreads
      .map((item, i) => {
        if (i < currentIndex) {
          return null;
        }
        if (i - 1 > currentIndex) return null;
        if (i == currentIndex) {
          return (
            <Animated.View
              key={item.uid}
              style={[
                rorateAndTraslate,
                {
                  position: 'absolute',
                  height: '100%',
                },
              ]}
              {...panResponder.panHandlers}>
              <SwipeCard
                setImage={setNumberOfImage}
                user={item.uid}
                images={item.uri}
                numberOfImage={numberOfImage}
                lengthOfImages={item.uri.length}
                likeOpacity={likeOpacity}
                dislikeOpacity={dislikeOpacity}
              />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={item.uid}
              style={[
                {
                  opacity: nextCardOpacity,
                  transform: [{scale: nextCardScale}],
                  position: 'absolute',
                  height: '100%',
                },
              ]}
              {...panResponder.panHandlers}>
              <SwipeCard
                setImage={setNumberOfImage}
                images={item.uri}
                numberOfImage={0}
              />
            </Animated.View>
          );
        }
      })
      .reverse();
  };
  return renderUsers();
};

export default SwipeCardContainer;
