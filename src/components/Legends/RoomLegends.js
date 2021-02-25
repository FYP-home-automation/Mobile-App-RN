import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  roomNumRoomTypeMapper,
  roomNumColorMapper,
} from 'HomeAutomation/src/utils/global';

const RoomLegends = ({}) => {
  const roomsNum = [0, 1, 2, 3, 4];

  const BoxWithType = num => {
    return (
      <View style={styles.boxContainer}>
        <View style={styles.box(num)}></View>
        <Text>{roomNumRoomTypeMapper[num]}</Text>
      </View>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Legends</Text>
          <View style={styles.legends}>
            {roomsNum.map(num => BoxWithType(num))}
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 30,
  },
  legends: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    width: 80,
  },
  title: {
    fontWeight: '600',
  },
  box: num => ({
    backgroundColor: roomNumColorMapper[num],
    width: 15,
    height: 15,
    marginRight: 8,
  }),
  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 5,
  },
});

export default RoomLegends;
