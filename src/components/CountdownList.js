import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ImageButton from './ImageButton';

/* Display a list of all of the countdowns */
class CountdownList extends Component {
  state = { countdownList: [] };

  componentWillReceiveProps() {
    //TODO: this can be done better
    const countdownList = this.sortByDate(this.props.countdowns.countdowns);
    this.setState({ countdownList });
  }

  componentWillMount() {
    //TODO: this as well, shouldn't be named countdowns.countdowns
    const countdownList = this.sortByDate(this.props.countdowns.countdowns);
    this.setState({ countdownList });
  }

  /* Calculate exactly how many days remain until an event */
  daysSincePost = (datePostedString) => {
    const datePosted = new Date(datePostedString);
    datePosted.setDate(datePosted.getDate() + 1);

    const today = new Date();

    const timeDiff = Math.abs(today.getTime() - datePosted.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  }

  /* Sort an array of objects with the date property by soonest to latest*/
  sortByDate = (dataArray) => {
    return dataArray.sort((a, b) => {
      return a.date > b.date;
    });
  }

  render() {
    var imageButtons = this.state.countdownList.map((event) => {
      return (
        <ImageButton
          key={event.id}
          imageUrl={event.image}
          name={event.name}
          date={this.daysSincePost(event.date)}
        />
      );
    })

    return (
      <ScrollView style={styles.listStyle}>
        {imageButtons}
      </ScrollView>
    );
  }
}

styles = {
  listStyle: {
    paddingBottom: 90
  }
}

const mapStateToProps = state => {
  return { countdowns: state.countdowns };
};

export default connect(mapStateToProps)(CountdownList);
