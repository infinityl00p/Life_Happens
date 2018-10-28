import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';
import { eventsFetch } from '../actions';
import Helper from '../utils/helpers';
import ImageButton from './ImageButton';
import { gradients } from '../stock_images/image_list';

/* Display a list of all of the countdowns */
/*Displaying a Local Image (add to array) {uri: 'assets-library://asset/asset.PNG?id=CE45FFCC-7C26-43AD-B09F-61D2DA7DBB8D&ext=PNG'}*/
class CountdownList extends Component {
  state = { countdownList: [] };

  componentWillMount() {
    this.props.eventsFetch();
  }

  componentWillReceiveProps(props) {
    this.handleListLoad(props.countdownList);
  }

  handleListLoad = (countdowns) => {
    let countdownList = this.formatListData(countdowns);
    countdownList = countdownList.length > 1 ? this.sortByDateTime(countdownList) : countdownList;
    this.setState({ countdownList });
  }

  formatListData = (countdownList) => {
    const countdownArray = [];

    _.forEach(countdownList, (eventObject) => {
      _.forEach(eventObject, (event, key) => {
        const { name, image, time, date } = event;
        const dateTimeString = Moment(`${date}T${time}Z`);
        //TODO: Moment and date are adding 7 hours to current time
        if (Moment(dateTimeString).isAfter(Moment())) {
          countdownArray.push({ id: key, name, image, time, date });
        }
      });
    });

    return countdownArray;
  }

  sortByDateTime = (countdownList) => {
    return countdownList.sort((a, b) => {
      const aDate = Helper.createDateObject(a.date, a.time);
      const bDate = Helper.createDateObject(b.date, b.time);

      return aDate > bDate ? 1 : -1; //Syntax required for android, otherwise it won't sort
    });
  }

  render() {
    const imageButtons = this.state.countdownList.map((event, i) => {
      const { id, image, name, date, time } = event;
      return (
        <ImageButton
          key={id}
          id={id}
          imageUrl={image}
          eventName={name}
          eventDate={date}
          eventTime={time}
          gradient={gradients[i % 3]}
        />
      );
    });

    return (
      <View style={styles.containerStyle}>
        {imageButtons.length ?
          <ScrollView>
            {imageButtons}
          </ScrollView>
          :
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.textStyle}>Add a countdown to get started!</Text>
          </View>
        }
        <View style={{ alignItems: 'flex-end', paddingBottom: 2 }}>
          {/*
          <Button
            title='Logout'
            borderRadius={100}
            onPress={async () => {
              await AsyncStorage.removeItem('loggedIn');
              if (await AsyncStorage.getItem('type') === 'email') {
                await AsyncStorage.removeItem('email');
                await AsyncStorage.removeItem('password');
              } else {
                await AsyncStorage.removeItem('google_token');
                await AsyncStorage.removeItem('fb_token');
              }
              Actions.auth();
            }}
          />
          */}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1
  },
  textStyle: {
    textAlign: 'center',
    color: '#bdc3c7',
    fontWeight: '800',
    fontSize: 20
  }
});

const mapStateToProps = state => {
  const countdownList = _.map(state.countdowns, (val) => {
    return { ...val };
  });

  return { countdownList };
};

export default connect(mapStateToProps, { eventsFetch })(CountdownList);
