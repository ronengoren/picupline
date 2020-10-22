import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {NewTextButton} from '../../components/basicComponents/NewTextButton';
import Colors from '../../constants/Colors';
import {transparentize} from '../../infra/utils/stringUtils';
import I18n from '../../infra/localization';
// import images from '/assets/images';

const BUTTON_HEIGHT = 50;

const styles = StyleSheet.create({
  absoluteWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonWrapper: {
    height: BUTTON_HEIGHT,
  },
  submitBtn: {
    height: BUTTON_HEIGHT,
    borderRadius: 10,
    borderWidth: 0,
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: Colors.white,
    // fontWeight: Colors.bold
  },
  gradient: {
    position: 'absolute',
    top: -50,
    height: 50,
    width: '100%',
  },
});

function SubmitButton({
  isDisabled,
  withTopGradient = true,
  isAbsolute,
  label = I18n.t('common.buttons.next'),
  padding,
  children,
  ...restProps
}) {
  return (
    <View style={[isAbsolute && styles.absoluteWrapper]}>
      <View style={styles.buttonWrapper}>
        {/* {withTopGradient && <Text>dfdf</Text>} */}
        {NewTextButton}
        {/* <NewTextButton
          style={styles.submitBtn}
          textStyle={styles.text}
          activeOpacity={0.5}
          customColor={
            isDisabled ? transparentize(Colors.green, 30) : Colors.green
          }
          {...restProps}
          >
          {label || children}
        </NewTextButton> */}
      </View>
    </View>
  );
}

export default SubmitButton;
