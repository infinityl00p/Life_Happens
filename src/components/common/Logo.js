import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';

const Logo = ({
  iosHeight,
  iosWidth,
  androidHeight,
  androidWidth,
  withText
}) => {
  const styles = StyleSheet.create({
    logoStyle: {
      height: Platform.OS === 'ios' ? iosHeight : androidHeight,
      width: Platform.OS === 'ios' ? iosWidth : androidWidth
    }
  });

  const imageSource = withText ? require('../../stock_images/Logo_with_text.png') : require('../../stock_images/Logo.png')

  return (
    <Image source={imageSource} style={styles.logoStyle} />
  );
};

export { Logo };
