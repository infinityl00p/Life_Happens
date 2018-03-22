import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#45aaf2" />
    </View>
  );
};

export default LoadingScreen;
