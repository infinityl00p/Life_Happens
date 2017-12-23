import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Card from './Card';
import Helpers from '../utils/helpers';
import CountdownTime from './CountdownTime';
import CountdownDescription from './CountdownDescription';

const ImageButton = ({ id, imageUrl, eventName, eventDate, eventTime }) => {
  const { imageStyle, timeContainer, infoContainer, days, daysText, time, nameStyle } = styles;

  const dateObject = Helpers.getDateObject(eventDate, eventTime);
  const timeLeft = Helpers.getTimeLeft(dateObject);

  return (
    <Card>
      <TouchableOpacity
        onPress={() => Actions.EventOverview({ id, imageUrl, eventName, eventDate, timeLeft })}
      >

        <Image
          style={imageStyle}
          source={{ uri: imageUrl }}
        />

        <View style={{ flexDirection: 'row', flex: 1, position: 'absolute'}}>
          <View style={timeContainer}>
            <CountdownTime
              days={timeLeft.days}
              hours={timeLeft.hours}
              minutes={timeLeft.minutes}
            />
          </View>

          <View style={{ borderWidth: 0.5, borderColor: '#fff'}}></View>

          <View style={infoContainer}>
            <CountdownDescription
              eventDate={eventDate}
              eventName={eventName}
            />
          </View>
        </View>

      </TouchableOpacity>
    </Card>
  );
};

const styles = {
  imageStyle: {
    flex: 2,
    height: 120,
    width: null,
    borderRadius: 5
  },
  timeContainer: {
    backgroundColor: 'transparent',
    width: 100,
    height: 120,
  },
  infoContainer: {
    backgroundColor: 'transparent',
    width: 235,
    height: 120
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
