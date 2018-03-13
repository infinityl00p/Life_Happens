import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';

const Logo = () => {
  return (
    <Image source={require('../../stock_images/Logo.png')} style={styles.logoStyle} />
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    height: Platform.OS === 'ios' ? 60 : 140,
    width: Platform.OS === 'ios' ? 60 : 140
  }
});


export { Logo };
