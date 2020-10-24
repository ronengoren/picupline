import React, {Component} from 'react';
import {Image as RnImage, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {memoize} from '../../infra/utils';
import {isAndroid} from '../../infra/utils/deviceUtils';

const defaultStyles = StyleSheet.create({
  wrapper: {
    width: 50,
    height: 50,
  },
});

const fastImageResizesModes = {
  contain: FastImage.resizeMode.contain,
  cover: FastImage.resizeMode.cover,
  stretch: FastImage.resizeMode.stretch,
  center: FastImage.resizeMode.center,
};

class Image extends Component {
  static getSize(uri, onSuccess, onError) {
    RnImage.getSize(uri, onSuccess, onError);
  }

  static prefetch(uri) {
    RnImage.prefetch(uri);
  }

  static isIOSLocalFile(uri) {
    return uri.startsWith('/private/') || uri.startsWith('/Users/');
  }

  static isAndroidLocalFile(uri) {
    return uri.startsWith('file://');
  }

  getMemoizedStyles = memoize(
    ({withInitialDimensions, style}) => [
      withInitialDimensions && defaultStyles.wrapper,
      style,
    ],
    ({withInitialDimensions, style}) =>
      `${withInitialDimensions}_${JSON.stringify(style)}`,
  );

  getMemoizedSource = memoize((source) => {
    let safeSource = typeof source === 'object' ? {...source} : source;
    if (typeof safeSource.uri === 'string') {
      safeSource.uri = safeSource.uri.trim();
      const {uri} = safeSource;
      if (uri.slice(0, 2) === '//') {
        safeSource = {uri: `http:${uri}`};
      }
      if (
        !uri ||
        (!uri.startsWith('http') &&
          !Image.isIOSLocalFile(uri) &&
          !Image.isAndroidLocalFile(uri))
      ) {
        uri && console.log({message: 'Not showing image', uri, source});
        return null;
      }
      if (isAndroid && uri.endsWith('.gif')) {
        const homeisUploadString = 'image/upload/';
        const uploadStringIndex = uri.search(homeisUploadString);
        if (uploadStringIndex > -1) {
          const insertPosition = uploadStringIndex + homeisUploadString.length;
          safeSource.uri = `${uri.slice(0, insertPosition)}f_jpg,${uri.slice(
            insertPosition,
          )}`;
        }
      }
    }
    return safeSource;
  }, JSON.stringify);

  render() {
    const {
      style,
      source,
      resizeMode,
      withInitialDimensions,
      showCredits,
      children,
      ...restProps
    } = this.props;
    if (!source) {
      return null;
    }
    const safeSource = this.getMemoizedSource(source);
    if (!safeSource) {
      return null;
    }

    if (showCredits) {
      return (
        <FastImage
          style={this.getMemoizedStyles({withInitialDimensions, style})}
          source={safeSource}
          resizeMode={fastImageResizesModes[resizeMode]}
          {...restProps}>
          {this.renderCredits()}
          {children}
        </FastImage>
      );
    }

    return (
      <FastImage
        style={this.getMemoizedStyles({withInitialDimensions, style})}
        source={safeSource}
        resizeMode={fastImageResizesModes[resizeMode]}
        {...restProps}>
        {children}
      </FastImage>
    );
  }

  //   renderCredits() {
  //     const { extraInfo, creditsMarginBottom } = this.props;
  //     return <ImageCredits extraInfo={extraInfo} marginBottom={creditsMarginBottom} />;
  //   }
}

export default Image;
