import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Helper from '../utils/helpers';
import ImageButton from './ImageButton';

/* Display a list of all of the countdowns */
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
    const imageButtons = this.state.countdownList.map((event) => {
      return (
        <ImageButton
          key={event.id}
          id={event.id}
          imageUrl={event.image}
          eventName={event.name}
          eventDate={event.date}
          eventTime={event.time}
        />
      );
    });

    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        {imageButtons}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return { countdowns: state.countdowns };
};

export default connect(mapStateToProps)(CountdownList);
