import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';

const Logo = ({ iosWidth, androidWidth }) => {
  const styles = StyleSheet.create({
    logoStyle: {
      height: Platform.OS === 'ios' ? iosWidth : androidWidth,
      width: Platform.OS === 'ios' ? iosWidth : androidWidth
    }
  });

  return (
    <Image source={require('../../stock_images/Logo.png')} style={styles.logoStyle} />
  );
};

export { Logo };
