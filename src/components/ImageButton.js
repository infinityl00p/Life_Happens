import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Helper from '../utils/helpers';
import Card from './Card';

const ImageButton = ({ id, imageUrl, eventName, eventDate }) => {
  const { imageStyle, textContainer, nameStyle, dateStyle } = styles;

  return (
    <Card>
      <TouchableOpacity
        onPress={() => Actions.EventOverview({ id, imageUrl, eventName, eventDate })}
      >

        <View>
          <Image
            style={imageStyle}
            source={{ uri: imageUrl }}
          />
        </View>

        <View style={textContainer}>
          <Text style={nameStyle}>{eventName}</Text>
          <Text style={dateStyle}>{Helper.daysSincePost(eventDate)} days left</Text>
        </View>

      </TouchableOpacity>
    </Card>
  );
};

const styles = {
  imageStyle: {
    flex: 1,
    height: 175,
    width: null,
    borderRadius: 5
  },
  textContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 20,
    left: 10,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
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
