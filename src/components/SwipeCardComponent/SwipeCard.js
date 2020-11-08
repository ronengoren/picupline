import React from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

const SwipeCard = (props) => {
  // console.log(props);
  return (
    <ImageBackground
      source={{
        uri: props.images,
      }}
      style={styles.image}>
      <View style={styles.changeImage}>
        <Pressable
          style={styles.pressLeft}
          onPress={() => {
            if (props.numberOfImage - 1 < 0) return null;
            props.setImage(props.numberOfImage - 1);
          }}>
          <Image
            source={require('../../assets/images/LIKE-2.png')}
            style={{width: 190, height: 150}}
          />
        </Pressable>
        <Pressable
          style={styles.pressRight}
          onPress={() => {
            if (props.numberOfImage + 1 >= props.lengthOfImages) return null;
            props.setImage(props.numberOfImage + 1);
          }}>
          <Image
            source={require('../../assets/images/nope.gif')}
            style={{width: 190, height: 200}}
          />
        </Pressable>
      </View>
      <View style={styles.infoBlock}>
        <Text style={styles.info}>{props.user}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    flexBasis: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignContent: 'stretch',
    borderColor: 'black',
    borderRadius: 15,
    overflow: 'hidden',
  },
  changeImage: {
    flexDirection: 'row',
    flexBasis: '85%',
    // backgroundColor: "green",
    height: 1,
    width: '100%',
  },
  pressLeft: {
    flexBasis: '50%',
    // backgroundColor: "red",
    height: '100%',
  },
  pressRight: {
    flexBasis: '50%',
    // backgroundColor: "blue",
    height: '100%',
  },
  infoBlock: {
    flexBasis: '15%',
    width: '100%',
    backgroundColor: 'gray',
  },
  info: {
    margin: 10,
    color: '#000',
  },
});

export default SwipeCard;
