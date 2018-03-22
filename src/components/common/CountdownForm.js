import React from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { Ionicons } from '@expo/vector-icons';
import { Overlay } from './';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const CountdownForm = ({
  onNameChange,
  name,
  onDateChange,
  date,
  onTimeChange,
  time,
  imageUri,
  onSubmit
}) => {
  const color = imageUri ? '#fff' : '#C7C7CD';

  const { containerStyle, rowStyle, imageStyle, inputStyle, submitIconStyle } = styles;
  const datePickerStyles = StyleSheet.create({
    dateText: {
      color,
      fontSize: 30,
    },
    placeholderText: {
      color,
      fontSize: 30,
    },
    dateInput: {
      borderColor: 'transparent',
      alignItems: 'flex-start'
    },
  });


  return (
    <View style={containerStyle}>
      <Image
        style={imageStyle}
        source={{ uri: imageUri || 'https://images.unsplash.com/photo-1500575351013-6b9af18d7722?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=53954f4acd2b374303fa56c178b9d9fd&auto=format&fit=crop&w=500&q=60' }}
      />
      <Overlay backgroundColor={'#000'} opacity={0.4} />
        <View style={rowStyle}>
          <TextInput
            label="Name"
            placeholder="Add Description"
            onChangeText={onNameChange}
            value={name}
            placeholderTextColor={'#c7c7cd'}
            underlineColorAndroid='rgba(0,0,0,0)'
            style={[inputStyle, { color }]}
          />
        </View>

        <View style={rowStyle}>
          <DatePicker
            mode="date"
            style={{ width: SCREEN_WIDTH, paddingLeft: 20 }}
            placeholder="Set a Date"
            format="YYYY-MM-DD"
            date={date || null}
            minDate={new Date()}
            maxDate="2100-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={datePickerStyles}
            onDateChange={onDateChange}
          />
        </View>

        <View style={rowStyle}>
          <DatePicker
            date={time}
            style={{ width: SCREEN_WIDTH, paddingLeft: 20 }}
            mode="time"
            placeholder="Set a time"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={datePickerStyles}
            onDateChange={onTimeChange}
          />
        </View>

        <View style={[rowStyle, { borderBottomWidth: 0 }]}>
          <TouchableOpacity
            onPress={() => { Actions.ImageGallery({ fromGallery: false }); }}
            style={{ backgroundColor: 'transparent', paddingLeft: 20 }}
          >
            <Text style={{ fontSize: 30, color }}>{_.truncate(imageUri, 10) || 'Select A Background'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <View style={submitIconStyle}>
            <Ionicons
              onPress={onSubmit}
              name='ios-checkmark-circle'
              size={70}
              color='#26de81'
            />
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: SCREEN_HEIGHT,
    paddingTop: (SCREEN_HEIGHT / 2) - 100
  },
  imageStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 0.5
  },
  inputStyle: {
    fontSize: 40,
    fontWeight: '900',
    width: SCREEN_WIDTH,
    paddingLeft: 20
  },
  submitIconStyle: {
    position: 'absolute',
    right: 15,
    bottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  }
});

export { CountdownForm };
