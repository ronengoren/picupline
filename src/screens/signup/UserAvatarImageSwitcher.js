import React from 'react';
import PropTypes from 'prop-types';
import {Animated, StyleSheet, Image} from 'react-native';
import {Easing} from 'react-native-reanimated';

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
});

class UserAvatarImageSwitcher extends React.Component {
  // eslint-disable-next-line react/sort-comp
  currentImageOpacity = new Animated.Value(1);
  prevImageOpacity = new Animated.Value(1);

  state = {
    prevSource: null,
  };

  render() {
    const {source, style, ...restProps} = this.props;
    const {prevSource} = this.state;

    return (
      <>
        <Animated.View
          style={[styles.imageContainer, {opacity: this.currentImageOpacity}]}>
          <Image {...restProps} style={style} source={{...source}} />
        </Animated.View>
        {prevSource && (
          <Animated.View
            style={[
              styles.imageContainer,
              styles.image,
              {opacity: this.prevImageOpacity},
            ]}>
            <Image {...restProps} style={style} source={prevSource} />
          </Animated.View>
        )}
      </>
    );
  }

  componentWillReceiveProps(nextProps) {
    const {source: newSource} = nextProps;
    const {source} = this.props;
    if (newSource !== source) {
      this.setState({prevSource: source});
      this.switchImagesAnimation();
    }
  }

  switchImagesAnimation = () => {
    const {animationDuration} = this.props;
    this.currentImageOpacity.setValue(1);
    this.prevImageOpacity.setValue(1);
    Animated.parallel([
      Animated.timing(this.currentImageOpacity, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.easeIn,
        useNativeDriver: true,
      }),
      Animated.timing(this.prevImageOpacity, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.easeIn,
        useNativeDriver: true,
      }),
    ]).start();
  };
}

export default UserAvatarImageSwitcher;
