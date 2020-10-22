import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  Platform,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../constants/Colors';
import Swiper from 'react-native-deck-swiper';
import {WelcomeScreenPics} from '../../constants/Pics';
import {WelcomeSwiper} from '../../components/WelcomeSwiper';

const NUMBER_OF_SLIDES = 3;

export default function Welcome({navigation}) {
  const [autoPlay, setautoPlay] = useState(true);
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const smallScreen =
    screenHeight <= 568 + Platform.select({android: 100, ios: 0});

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} barStyle="dark-content" />
      <Swiper
        cards={WelcomeScreenPics}
        renderCard={WelcomeSwiper}
        // keep looping cards infinitely
        backgroundColor="white"
        cardHorizontalMargin={0}
        stackSize={2} // number of cards shown in background
        onSwipedAll={() => {
          navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  lowerSection: {
    paddingHorizontal: 15,
  },
  slider: {
    marginTop: 40,
  },
  subTitle: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 30,
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
  },
  subTitleText: {
    fontSize: 22,
    lineHeight: 26,
    color: Colors.b30,
  },
  subTitleSmallScreen: {
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 17,
    lineHeight: 22,
  },
  subTitle1: {
    paddingHorizontal: 15,
  },
});
