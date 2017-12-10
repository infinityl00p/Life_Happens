import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ImageButton from './ImageButton';

/* Display a list of all of the countdowns */
class CountdownList extends Component {
  state = { countdownList: [] };

  componentWillReceiveProps(props) {
    //TODO: this can be done better
    const countdownList = this.sortByDate(props.countdowns.countdowns);
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
      const aDate = this.parseDateString(a.date);
      const bDate = this.parseDateString(b.date);

      return aDate > bDate;
    });
  }

  parseDateString = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day);
  }

  render() {
    var imageButtons = this.state.countdownList.map((event) => {
      return (
        <ImageButton
          key={event.id}
          id={event.id}
          imageUrl={event.image}
          name={event.name}
          date={this.daysSincePost(event.date)}
        />
      );
    })

    return (
      <ScrollView>
        {imageButtons}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return { countdowns: state.countdowns };
};

export default connect(mapStateToProps)(CountdownList);
