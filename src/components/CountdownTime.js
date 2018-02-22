import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const CountdownTime = ({ days, hours, minutes }) => {
  const { containerStyle, daysStyle, textStyle, timeContainer, timeStyle } = styles;
  const dayString = (days < 0) ? "days ago" : "days";

  return (
    <View style={containerStyle}>
      <Text style={daysStyle}>{Math.abs(days)}</Text>
      <Text style={textStyle}>{dayString}</Text>
      <View style={timeContainer}>
        <Text style={timeStyle}>{Math.abs(hours)}h {Math.abs(minutes)}m</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center'
  },
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
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 100
  },
  timeStyle: {
    marginRight: 7,
    marginLeft: 7,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default CountdownTime;
