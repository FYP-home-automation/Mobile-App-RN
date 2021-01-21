import React from 'react';

import { Icon } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

import {
  statsSymbolMappper,
  statsIconNameMapper,
} from 'HomeAutomation/src/utils/global';

const RoomStats = ({ value, type }) => {
  return (
    <View style={styles.roomStatsContainer}>
      <Icon name={statsIconNameMapper[type]} style={styles.icon} />
      <Text style={styles.statsStyle}>
        {value} {statsSymbolMappper[type]}
      </Text>
    </View>
  );
};

const RoomStatsBar = ({ temp, humidity, brightness }) => {
  return (
    <View style={styles.container}>
      <RoomStats value={temp} type="temp" />
      <RoomStats value={brightness} type="brightness" />
      <RoomStats value={humidity} type="humidity" />
    </View>
  );
};

const styles = StyleSheet.create({
  statsStyle: {
    fontSize: 17,
  },
  icon: {
    marginRight: 11,
    opacity: 0.7,
  },
  roomStatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 28,
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 28,
    paddingTop: 10,
  },
});

export default RoomStatsBar;
