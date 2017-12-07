import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const IconButton = ({ name, size, color }) => {
  return (
    <TouchableOpacity style={styles.iconStyle}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = {
  iconStyle: {
    marginTop: 20,
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default IconButton;
