import React from 'react';
import { View, Text } from 'react-native';

const TextOverview = ({ eventName, eventDate }) => {
  return (
    <View style={{ paddingTop: 100, paddingLeft: 10, paddingRight: 10 }}>
      <View>
        <Text style={{ color: '#fff', fontSize: 30 }}>{eventName}</Text>
      </View>
      <View>
        <Text style={{ color: '#fff', fontSize: 25, paddingTop: 10 }}>
          {eventDate}
        </Text>
      </View>
      <View>
        <Text style={{ color: '#fff', fontSize: 18, paddingTop: 10 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised
          in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.</Text>
      </View>
    </View>
  );
};

export default TextOverview;
