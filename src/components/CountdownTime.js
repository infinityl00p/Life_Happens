import React from 'react';
import { View, Text } from 'react-native';


const CountdownTime = ({ days, hours, minutes }) => {
  const { daysStyle, textStyle, timeContainer, timeStyle } = styles;

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={daysStyle}>{days}</Text>
      <Text style={textStyle}>days</Text>
      <View style={timeContainer}>
        <Text style={timeStyle}>{hours}h {minutes}m</Text>
      </View>
    </View>
  );
};

const styles = {
  daysStyle: {
    color: '#fff',
    fontSize: 50,
    fontWeight: '100',
    textAlign: 'center',
    top: 10
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '400'
  },
  timeContainer: {
    width: 65,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 100
  },
  timeStyle: {
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
  },
};

export default CountdownTime;
