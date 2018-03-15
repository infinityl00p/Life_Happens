import React from 'react';
import { View, StyleSheet } from 'react-native';

const Overlay = ({ opacity, backgroundColor }) => {
  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor,
      opacity
    }
  })

  return (
    <View style={styles.overlay} />
  );
};

export { Overlay };