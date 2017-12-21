import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Helper from '../utils/helpers';


const ImageOverview = ({ eventName, eventDate }) => {
  const { textContainer, imageNameStyle, imageDateStyle } = styles;

  return (
    <View style={textContainer}>
      <Text style={imageNameStyle}>{eventName}</Text>
      <Text style={imageDateStyle}>
        {Helper.daysSincePost(eventDate)} days left
      </Text>
    </View>
  );
};

const styles = {
  textContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 160,
    left: 30,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  imageNameStyle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '400',
    paddingBottom: 10
  },
  imageDateStyle: {
    color: '#fff',
    fontWeight: '300',
    fontSize: 20
  },
};

export default ImageOverview;
