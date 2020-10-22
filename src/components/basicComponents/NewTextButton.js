import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 70,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.b90,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  small35Wrapper: {
    height: 35,
    borderRadius: 10,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  smallWrapper: {
    height: 36,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  bigWrapper: {
    height: 45,
    borderRadius: 45,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  big45Wrapper: {
    height: 45,
    borderRadius: 45,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  big50Wrapper: {
    height: 50,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  big55Wrapper: {
    height: 55,
    borderRadius: 15,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  big60Wrapper: {
    height: 60,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  big90Wrapper: {
    height: 90,
    borderRadius: 10,
  },
  fullWidth: {
    flex: 1,
  },
  defaultText: {
    fontSize: 15,
    lineHeight: 18,
    color: Colors.b30,
    textAlign: 'center',
  },
  defaultIcon: {
    marginRight: 5,
    color: Colors.b30,
  },
  secondary: {
    backgroundColor: Colors.paleGreyTwo,
  },
  secondaryText: {
    color: Colors.b60,
  },
  secondaryIcon: {
    color: Colors.b60,
  },
  activeText: {
    color: Colors.azure,
  },
  activeIcon: {
    color: Colors.azure,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  thanksEmoji: {
    width: 20,
    height: 18,
    marginRight: 5,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  clapEmoji: {
    width: 20,
    height: 22,
    marginRight: 5,
  },
});

class NewTextButton extends React.Component {
  static sizes = {
    SMALL35: 'small35',
    SMALL: 'small',
    MEDIUM: 'medium',
    BIG: 'big',
    BIG45: 'big45',
    BIG50: 'big50',
    BIG55: 'big55',
    BIG60: 'big60',
    BIG90: 'big90',
  };

  render() {
    // const {
    //   size,
    //   width,
    //   active,
    //   disabled,
    //   busy,
    //   secondary,
    //   customColor,
    //   style,
    //   textStyle,
    //   iconName,
    //   onPress,
    //   iconSize = 20,
    //   iconLineHeight,
    //   iconWeight,
    //   children,
    //   hitSlop,
    //   iconStyle,
    //   emoji,
    //   withShadow,
    //   numberOfLines,
    //   activeOpacity,
    //   iconWrapperStyle,
    //   autoWidth,
    //   ...props
    // } = this.props;
    // const containerStyles = [
    //   withShadow && commonStyles.shadow,
    //   styles.wrapper,
    //   !autoWidth && (width ? {width} : styles.fullWidth),
    //   styles[`${size}Wrapper`],
    //   (secondary || disabled) && styles.secondary,
    //   customColor && {backgroundColor: customColor, borderColor: customColor},
    //   style,
    // ];
    // const textStyles = [
    //   styles.defaultText,
    //   (secondary || disabled) && styles.secondaryText,
    //   active && styles.activeText,
    //   textStyle,
    // ];
    // const iconStyles = [
    //   styles.defaultIcon,
    //   (secondary || disabled) && styles.secondaryIcon,
    //   active && styles.activeIcon,
    //   {lineHeight: iconLineHeight || iconSize},
    //   iconStyle,
    // ];
    // const spinnerColor = Colors.white;
    // const IconComponent = iconWeight ? AwesomeIcon : HomeisIcon;

    return (
      <TouchableOpacity
      // style={containerStyles}
      // accessible
      // accessibilityComponentType="button"
      // accessibilityTraits="button"
      // activeOpacity={activeOpacity}
      // hitSlop={hitSlop}
      // onPress={busy || disabled ? null : onPress}
      // {...props}
      >
        <Text>dfdfsdfdf</Text>
        {/* {!busy && [
          !!iconName && (
            <View style={iconWrapperStyle} key="icon">
              <IconComponent
                name={iconName}
                size={iconSize}
                weight={iconWeight}
                style={iconStyles}
              />
            </View>
          ),
          !!emoji && (
            <View style={iconWrapperStyle} key="emoji">
              <Image
                source={images.emoji[emoji]}
                style={styles[`${emoji}Emoji`]}
              />
            </View>
          ),
          !!children && (
            <Text numberOfLines={numberOfLines} style={textStyles} key="text">
              {children}
            </Text>
          ),
        ]}
        {busy && (
          <Spinner
            style={styles.spinner}
            center
            size="small"
            color={spinnerColor}
          />
        )} */}
      </TouchableOpacity>
    );
  }
}

export default NewTextButton;
