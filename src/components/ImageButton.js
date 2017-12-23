import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';
import Helper from '../utils/helpers';
import Card from './Card';

const getDateObject = (date, time) => {
  const [year, month, day] = date.split('-');
  const dateObject = new Date(year, month - 1, day);

  const [hours, minutes] = time.split(':');
  dateObject.setHours(hours);
  dateObject.setMinutes(minutes);

  return dateObject;
};

const getTimeLeft = (dateObject) => {
  const now = Moment(new Date());
  const eventDate = Moment(dateObject);

  const diffDuration = Moment.duration(eventDate.diff(now));

  return {
    days: diffDuration.days(),
    hours: diffDuration.hours(),
    minutes: diffDuration.minutes(),
    seconds: diffDuration.seconds()
  };
};

const ImageButton = ({ id, imageUrl, eventName, eventDate, eventTime }) => {
  const { imageStyle, timeContainer, infoContainer, days, daysText, time, nameStyle } = styles;

  const dateObject = getDateObject(eventDate, eventTime);
  const timeLeft = getTimeLeft(dateObject);

  return (
    <Card>
      <TouchableOpacity
        onPress={() => Actions.EventOverview({ id, imageUrl, eventName, eventDate, timeLeft })}
      >

        <View>
          <Image
            style={imageStyle}
            source={{ uri: imageUrl }}
          />
        </View>

        <View style={timeContainer}>
          <Text style={days}>{timeLeft.days}</Text>
          <Text style={daysText}>days</Text>
          <Text style={time}>{timeLeft.hours}h {timeLeft.minutes}m</Text>
        </View>

        <View style={infoContainer}>
          <Text style={nameStyle}>{eventName}</Text>
        </View>

      </TouchableOpacity>
    </Card>
  );
};

const styles = {
  imageStyle: {
    flex: 1,
    height: 130,
    width: null,
    borderRadius: 5
  },
  timeContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 10,
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  days: {
    color: '#fff',
    fontSize: 60,
    fontWeight: '100',
    textAlign: 'center'
  },
  daysText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  time: {
    color: 'transparent',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: 15
  },
  infoContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 20,
    left: 10,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameStyle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20
  },
  dateStyle: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 15
  }
};

export default ImageButton;
