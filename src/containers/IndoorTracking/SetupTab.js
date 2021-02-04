import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import data from '../../assets/rooms.json';
import { roomNumColorMapper } from 'HomeAutomation/src/utils/global';

const SetupTab = () => {
  const roomnums = data.roomnums;
  const [colorMapper, setColorMapper] = useState(roomNumColorMapper);

  useEffect(() => {
    setInterval(() => {
      const dummyColor = [
        '#FFA500',
        '#0000FF',
        '#800080',
        '#808080',
        '#00FFFF',
      ];
      const newColorMapper = { ...colorMapper };

      for (let i = 1; i < 8; i++) {
        const color = dummyColor[getRandomInt(0, 4)];
        newColorMapper[i] = color;
      }

      setColorMapper(newColorMapper);
    }, 2000);
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        {roomnums.map(roomCol => (
          <View>
            {roomCol.map(roomNum => (
              <View style={styles.testing(roomNum, colorMapper)}></View>
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
  testing: (roomNum, colorMapper) => ({
    width: 2,
    height: 2,
    backgroundColor: colorMapper[roomNum] ? colorMapper[roomNum] : 'white',
  }),
});

export default SetupTab;
