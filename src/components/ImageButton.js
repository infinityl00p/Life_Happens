import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Card from './Card';

const ImageButton = ({ id, imageUrl, name, date }) => {
  return (
    <Card>
      <TouchableOpacity
        onPress={() => Actions.EventOverview({ id, imageUrl, eventName: name, date })}
      >
        <View>
          <Image
            style={styles.imageStyle}
            source={{ uri: imageUrl }}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.nameStyle}>{name}</Text>
          <Text style={styles.dateStyle}>{date} days left</Text>
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
  container: {
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
