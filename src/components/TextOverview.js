import React from 'react';
import { View, Text } from 'react-native';
import Helpers from '../utils/helpers';

const TextOverview = ({ eventName, dateObject }) => {
  return (
    <View style={{ paddingTop: 100, paddingLeft: 10, paddingRight: 10 }}>
      <View>
        <Text style={{ color: '#fff', fontSize: 30 }}>{eventName}</Text>
      </View>
      <View>
        <Text style={{ color: '#fff', fontSize: 25, paddingTop: 10 }}>
          {Helpers.getShorthandDateTime(dateObject)}
        </Text>
      </View>
    </View>
  );
};

export default TextOverview;
