import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Helper from '../utils/helpers';
import ImageButton from './ImageButton';

/* Display a list of all of the countdowns */
/*Displaying a Local Image (add to array) {uri: 'assets-library://asset/asset.PNG?id=CE45FFCC-7C26-43AD-B09F-61D2DA7DBB8D&ext=PNG'}*/
const gradients = [require('../stock_images/SweetMorning.jpg'),
                    require('../stock_images/Hazel.jpg'),
                    require('../stock_images/HarmonicEnergy.jpg')];

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

  /* Sort an array of objects with the date property by soonest to latest*/
  sortByDate = (dataArray) => {
    return dataArray.sort((a, b) => {
      const aDate = Helper.parseDateString(a.date);
      const bDate = Helper.parseDateString(b.date);

      return aDate > bDate;
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
          gradientImage={gradients[i % 3]}
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

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1
  }
}

const mapStateToProps = state => {
  return { countdowns: state.countdowns };
};

export default connect(mapStateToProps)(CountdownList);
