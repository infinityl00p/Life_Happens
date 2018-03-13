import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import {
  Card,
  CardSection,
  Input,
  Button,
} from './';

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
  const color = imageUri ? "#fff" : "#000";

  const datePickerStyles = StyleSheet.create({
    dateText: {
      color,
      fontSize: 18,
      lineHeight: 23,
      flex: 2,
      paddingTop: 8
    },
    placeholderText: {
      color: '#bfbfbf',
      fontSize: 18
    },
    dateInput: {
      borderColor: 'transparent',
      alignItems: 'flex-start',
    }
  });


  return (
    <View style={styles.containerStyle}>
      {imageUri ?
        <Image
          style={styles.imageStyle}
          source={{ uri: imageUri }}
        /> :
        <View />
      }
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="New Years"
            onChangeText={onNameChange}
            value={name}
            fontColor={color}
          />
        </CardSection>

        <CardSection>
            <View style={styles.rowStyle}>
              <Text style={[styles.labelStyle, { color }]}>Date</Text>
              <DatePicker
                style={{ width: 210 }}
                mode="date"
                placeholder="Select Date"
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
          </CardSection>

          <CardSection>
            <View style={styles.rowStyle}>
              <Text style={[styles.labelStyle, { color }]}>Time</Text>
              <DatePicker
                style={{ width: 210 }}
                date={time}
                mode="time"
                placeholder="Select Time"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={datePickerStyles}
                onDateChange={onTimeChange}
              />
            </View>
          </CardSection>

        <CardSection>
          <Button
            label="Image"
            onPress={() => { Actions.ImageGallery({ fromGallery: false }); }}
            colors={imageUri ? {
              fontColor: "#fff",
              backgroundColor: "transparent",
              borderColor: "#fff"
            } : null}
          >
            Select a Background
          </Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={onSubmit}
            colors={imageUri ? {
                fontColor: "#fff",
                backgroundColor: "transparent",
                borderColor: "#fff"
              } : null
            }
          >
            Save Event
          </Button>
        </CardSection>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    height: Dimensions.get('window').height
  },
  imageStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  rowStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export { CountdownForm };
