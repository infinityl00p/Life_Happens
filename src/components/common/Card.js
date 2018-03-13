import React from 'react';
import { View, StyleSheet } from 'react-native';


const Card = (props) => {
  const { containerStyle } = styles;

  return (
    <View style={containerStyle} >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    backgroundColor: 'transparent'
  }
});

export { Card };
