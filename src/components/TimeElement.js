import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimeElement = ({ name, value }) => {
  const { valueStyle, nameStyle } = styles;

  return (
    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Text style={valueStyle}>{Math.abs(value)}</Text>
      <Text style={nameStyle}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  valueStyle: {
    color: '#fff',
    fontSize: 50,
    fontWeight: '200',
    textAlign: 'center'
  },
  nameStyle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default TimeElement;
