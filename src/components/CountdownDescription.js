import React from 'react';
import { View, Text } from 'react-native';
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

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15
  },
  date: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  name: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 22
  }
};

export default CountdownDescription;

