import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const IconBar = ({ onEditPress, onTrashPress }) => {
  return (
    <View>

      <TouchableOpacity style={styles.editContainer}>
        <FAIcon
          name='pencil'
          size={30}
          color='#fff'
          onPress={onEditPress}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.arrowContainer}>
        <Icon
          name='md-arrow-down'
          size={40}
          color='#fff'
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.trashContainer}>
        <Icon
          name='ios-trash'
          size={40}
          color='#fff'
          onPress={onTrashPress}
        />
      </TouchableOpacity>

    </View>
  );
};

const styles = {
  editContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  arrowContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 100,
    right: 100,
    bottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  trashContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 10,
    bottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
};

export default IconBar;