import React from 'react';
import { View, Text } from 'react-native';


const CountdownTime = ({ days, hours, minutes }) => {
  const { daysStyle, textStyle, timeStyle } = styles;

  return (
    <View>
      <Text style={daysStyle}>{days}</Text>
      <Text style={textStyle}>days</Text>
      <Text style={timeStyle}>{hours}h {minutes}m</Text>
    </View>
  );
};

const styles = {
  daysStyle: {
    color: '#fff',
    fontSize: 50,
    fontWeight: '100',
    textAlign: 'center',
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,

    textAlign: 'center',
    fontWeight: '400'
  },
  timeStyle: {
    color: '#fff',
    borderRadius: 15,
    textAlign: 'center'
  },
};

export default CountdownTime;
