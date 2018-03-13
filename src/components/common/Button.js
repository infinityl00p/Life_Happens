import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ onPress, children, colors }) => {
  const { buttonStyle, textStyle } = styles;
  const fontColor = colors ? colors.fontColor : "#007aff";
  const borderColor = colors ? colors.borderColor : "#007aff";
  const backgroundColor = colors ? colors.backgroundColor : "#fff";

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, { borderColor, backgroundColor }]}>
      <Text style={[textStyle, { color: fontColor }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
});

export { Button };
