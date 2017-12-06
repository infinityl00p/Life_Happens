import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ImageButton from './ImageButton';
import IconButton from './IconButton';

const data = [
  {
    id: 0,
    name: 'Visit London',
    description: 'Drink 3 pints a day to prepare the binge drinking culture in london',
    date: new Date(2018, 2, 15),
    image: require('../images/london.jpg')
  },
  {
    id: 1,
    name: 'Visit San Francisco',
    description: 'Lose 20 pounds of fat and put on 100lbs of muscle',
    date: new Date(2017, 11, 29),
    image: require('../images/san_francisco.jpg')
  },
  {
    id: 2,
    name: 'Celebrate Christmas',
    description: 'Put up the christmas tree and decorate the lights.',
    date: new Date(2017, 11, 25),
    image: require('../images/christmas.jpg')
  },
  {
    id: 3,
    name: 'New Years Goals',
    description: 'Have all of my new years resolutions written out before I leave',
    date: new Date(2018, 0, 1),
    image: require('../images/new_years.jpg')
  },
  {
    id: 4,
    name: 'Visit Barcelona',
    description: 'hola, como estas? Learn beginner spanish before leaving',
    date: new Date(2018, 1, 15),
    image: require('../images/barcelona.jpg')
  }
];

class CountdownList extends Component {
  state = { countdownList: [] };

  componentWillMount() {
    const countdownList = this.sortByDate(data);
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
        <ImageButton key={event.id} imageUrl={event.image} name={event.name} date={this.daysSincePost(event.date)}/>
      );
    })

    return (
      <ScrollView>
        {imageButtons}
        <IconButton name='plus-circle' size={60} color='#bdc3c7' />
      </ScrollView>
    );
  }
}

export default CountdownList;
