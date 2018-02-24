import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';


const CountdownTime = ({ days, hours, minutes, timeColor }) => {
  const { containerStyle, daysStyle, textStyle, timeContainer } = styles;

  const timeStyle = StyleSheet.create({
    style: {
      marginRight: 7,
      marginLeft: 7,
      fontWeight: '700',
      textAlign: 'center',
      color: timeColor
    }
  });

  const timeLeftDescription = (days < 1) ? 'hours' : 'days';
  let timeLeft = Math.abs(days);

  if (timeLeftDescription === 'hours') {
    timeLeft = Math.abs(hours);
  }

  return (
    <View style={containerStyle}>
      <Text style={daysStyle}>{timeLeft}</Text>
      <Text style={textStyle}>{timeLeftDescription}</Text>
      <View style={timeContainer}>
        <Text style={timeStyle.style}>{Math.abs(hours)}h {Math.abs(minutes)}m</Text>
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
    fontSize: Platform.OS === 'ios' ? 50 : 40,
    fontWeight: Platform.OS === 'ios' ? '200' : '100',
    textAlign: 'center',
    top: Platform.OS === 'ios' ? 3 : 0
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: Platform.OS === 'ios' ? '600' : '300',
    fontSize: 20,
    letterSpacing: Platform.OS === 'ios' ? 3 : 0,
    paddingBottom: Platform.OS === 'ios' ? 6 : 4
  },
  timeContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 100
  }
});

export default CountdownTime;
