import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Helper from '../utils/helpers';
import ImageButton from './ImageButton';

/* Display a list of all of the countdowns */
/*Displaying a Local Image (add to array) {uri: 'assets-library://asset/asset.PNG?id=CE45FFCC-7C26-43AD-B09F-61D2DA7DBB8D&ext=PNG'}*/
const gradients = [
  {
    image: require('../stock_images/SweetMorning.jpg'),
    textColor: '#ff5f6d'
  },
  {
    image: require('../stock_images/Hazel.jpg'),
    textColor: '#77a1d3'
  },
  {
    image: require('../stock_images/HarmonicEnergy.jpg'),
    textColor: '#16A085'
  }
];

class CountdownList extends Component {
  state = { countdownList: [] };

  componentWillMount() {
    //TODO: this as well, shouldn't be named countdowns.countdowns
    const countdownList = this.sortByDate(this.props.countdowns.countdowns);
    this.setState({ countdownList });
  }

  componentWillReceiveProps(props) {
    //TODO: this can be done better
    const countdownList = this.sortByDate(props.countdowns.countdowns);
    this.setState({ countdownList });
  }

  sortByDate = (dataArray) => {
    return dataArray.sort((a, b) => {
      const aDate = Helper.parseDateString(a.date);
      const bDate = Helper.parseDateString(b.date);

      return aDate > bDate ? 1 : -1; //Syntax required for android, otherwise it won't sort
    });
  }

  render() {
    const imageButtons = this.state.countdownList.map((event, i) => {
      return (
        <ImageButton
          key={event.id}
          id={event.id}
          imageUrl={event.image}
          eventName={event.name}
          eventDate={event.date}
          eventTime={event.time}
          gradient={gradients[i % 3]}
        />
      );
    });

    return (
      <ScrollView style={styles.containerStyle}>
        {imageButtons}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1
  }
});

const mapStateToProps = state => {
  return { countdowns: state.countdowns };
};

export default connect(mapStateToProps)(CountdownList);
