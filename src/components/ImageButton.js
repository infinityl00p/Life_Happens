import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';
import Card from './Card';
import Helpers from '../utils/helpers';
import CountdownTime from './CountdownTime';
import CountdownDescription from './CountdownDescription';

const ImageButton = ({ id, imageUrl, eventName, eventDate, eventTime }) => {
  const { imageStyle, container, timeContainer, infoContainer } = styles;

  const dateObject = Helpers.getDateObject(eventDate, eventTime);
  const timeLeft = Helpers.getTimeLeft(dateObject);

  return (
    <Card>
      <TouchableOpacity
        onPress={() => {
            Actions.EventOverview({ id, imageUrl, eventName, eventTime, dateObject, eventDate });
          }
        }
      >

        <Image
          style={imageStyle}
          source={{ uri: imageUrl }}
        />

        <View style={container}>
          <View style={timeContainer}>
            <CountdownTime
              days={timeLeft.days}
              hours={timeLeft.hours}
              minutes={timeLeft.minutes}
            />
          </View>

          <View style={{ borderWidth: 0.5, borderColor: '#fff' }} />

          <View style={infoContainer}>
            <CountdownDescription
              eventDate={Moment(dateObject)}
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
  container: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute'
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
