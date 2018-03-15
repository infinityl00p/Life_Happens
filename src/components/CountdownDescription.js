import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Helpers from '../utils/helpers';

const CountdownDescription = ({ eventDate, eventName }) => {
  const { container, date, name } = styles;

  return (
    <View style={container}>
      <View>
        <Text style={date}>
          {Helpers.getShorthandDateTime(eventDate)}
        </Text>
      </View>

      <View>
        <Text style={name}>
          {eventName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25
  },
  date: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '700',
    fontSize: 16
  },
  name: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '700',
    fontSize: 22
  }
});

export default CountdownDescription;

