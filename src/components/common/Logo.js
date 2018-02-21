import React from 'react';
import { Image } from 'react-native';

const Logo = () => {
  return (
    <Image source={require('../../stock_images/Logo.png')} style={{ height: 60, width: 60 }} />
  );
};

export default Logo;
