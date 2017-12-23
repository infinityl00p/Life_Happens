import React from 'react';
import { View, Text } from 'react-native';
import Moment from 'moment';
import Helpers from '../utils/helpers';
import TimeElement from './TimeElement';


const ImageOverview = ({ eventName, eventDate, eventTime, dateObject }) => {
  const { container, textContainer, nameStyle, dateStyle, timeContainer } = styles;

  const diffDateObject = Helpers.getDateObject(eventDate, eventTime);
  const timeLeft = Helpers.getTimeLeft(diffDateObject);

  return (
    <View style={container}>
      <View style={textContainer}>
        <Text style={dateStyle}>{Helpers.getShorthandDateTime(dateObject)}</Text>
        <Text style={nameStyle}>{eventName}</Text>
      </View>
      <View style={{ borderWidth: 0.5, borderColor: '#fff' }} />
      <View style={timeContainer}>
        <TimeElement name='days' value={timeLeft.days} />
        <TimeElement name='hours' value={timeLeft.hours} />
        <TimeElement name='minutes' value={timeLeft.minutes} />
        <TimeElement name='seconds' value={timeLeft.seconds} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 300,
    bottom: 0,
    left: 0,
    right: 0
  },
  textContainer: {
    backgroundColor: 'transparent',
    left: 40
  },
  nameStyle: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '700',
    paddingBottom: 10
  },
  dateStyle: {
    color: '#fff',
    fontWeight: '300',
    fontSize: 25,
    fontWeight: '700'
  },
  timeContainer: {
    backgroundColor: 'transparent',
    paddingTop: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  }
};

export default ImageOverview;
