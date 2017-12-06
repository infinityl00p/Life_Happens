import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import ImageButton from './ImageButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const countdownList = [
  {
    id: 0,
    name: 'Celebrate Christmas',
    description: 'Put up the christmas tree and decorate the lights.',
    date: new Date(2017, 11, 25),
    image: require('../images/christmas.jpg')
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
    name: 'New Years Goals',
    description: 'Have all of my new years resolutions written out before I leave',
    date: new Date(2018, 0, 1),
    image: require('../images/new_years.jpg')
  },
  {
    id: 3,
    name: 'Visit Barcelona',
    description: 'hola, como estas? Learn beginner spanish before leaving',
    date: new Date(2018, 1, 15),
    image: require('../images/barcelona.jpg')
  },
  {
    id: 4,
    name: 'Visit London',
    description: 'Drink 3 pints a day to prepare the binge drinking culture in london',
    date: new Date(2018, 2, 15),
    image: require('../images/london.jpg')
  }
];

class CountdownList extends Component {
  state = { countdownList: [] };

  componentWillMount() {
    this.setState({ countdownList });
  }

  daysSincePost = (datePostedString) => {
    var datePosted = new Date(datePostedString);
    datePosted.setDate(datePosted.getDate()+1);

    var today = new Date();

    var timeDiff = Math.abs(today.getTime() - datePosted.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 *  24));

    return diffDays;
  }


  render() {
    return (
      <ScrollView>
        {this.state.countdownList.map((event) => {
          return (
            <ImageButton key={event.id} imageUrl={event.image} name={event.name} date={this.daysSincePost(event.date)}/>
          );
        })}
        <View style={styles.iconStyle}>
          <Icon name="plus-circle" size={60} color='#3498db' />
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  iconStyle: {
    marginTop: 20,
    marginBottom: 60,
    justifyContent: "center",
    alignItems: "center"
  }
}

export default CountdownList;
