import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { roomNumColorMapper } from 'HomeAutomation/src/utils/global';
import data from '../../assets/rooms.json';

const RoomLegends = ({ roomNum, roomNumToType }) => {
  console.log(roomNum);
  console.log(roomNumToType);
  // console.log('inside asd');
  const roomdict = data.roomdict;
  const roomArr = Object.values(roomNumToType);
  const uniqueRoomArr = [...new Set(roomArr)];
  // console.log(uniqueRoomArr);

  const BoxWithType = num => {
    return (
      <View style={styles.boxContainer}>
        <View style={styles.box(num)}></View>
        <Text>{uniqueRoomArr[num - 1]}</Text>
      </View>
    );
  };

  const legends = [];

  for (let i = 1; i <= uniqueRoomArr.length; i++) {
    legends.push(BoxWithType(i));
  }

  return (
    <View style={styles.outerContainer}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Legend</Text>
          <View style={styles.legends}>{legends}</View>
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
    width: 110,
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
