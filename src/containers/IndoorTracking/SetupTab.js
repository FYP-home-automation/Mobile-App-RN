import React from 'react';
import { View, StyleSheet } from 'react-native';
import data from '../../assets/rooms.json';

const SetupTab = () => {
  console.log('inside');
  console.log(data.roomnums.length);
  console.log(data.roomnums[0].length);
  console.log(data.roomnums[2].length);

  const roomnums = data.roomnums;
  console.log(roomnums.length);
  console.log(roomnums[0].length);

  const slicedRoomnums = roomnums.slice(1, 20);

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        {slicedRoomnums.map(roomCol => (
          <View>
            {roomCol.map(room => (
              <View style={styles.testing}></View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#ff4081',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testing: {
    width: 1,
    height: 1,
    backgroundColor: 'black',
  },
});

export default SetupTab;
