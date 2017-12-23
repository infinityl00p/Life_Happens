import React from 'react';
import { View, Text } from 'react-native';

const TimeElement = ({ name, value }) => {
  return (
    <View style={{paddingLeft: 10, paddingRight: 10}}>
      <Text style={{ color: '#fff', fontSize: 50, fontWeight: '200', textAlign: 'center' }}>{value}</Text>
      <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>{name}</Text>
    </View>
  );
};

export default TimeElement;
