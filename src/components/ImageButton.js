import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import Card from './Card';

const ImageButton = ({ imageUrl, name, date }) => {
  return (
    <Card>
      <TouchableOpacity>
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
    height: 200,
    width: null,
    borderRadius: 10
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
