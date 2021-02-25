import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import data from '../../assets/rooms.json';
import { roomNumColorMapper } from 'HomeAutomation/src/utils/global';
import { RoomLegends } from 'HomeAutomation/src/components';

import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import AnimatedLoader from 'react-native-animated-loader';

import LottieView from 'lottie-react-native';

const userLocationBoxSize = 40;

const TrackingTab = ({ image, setImage }) => {
  const roomnums = data.roomnums;
  const [colorMapper, setColorMapper] = useState(roomNumColorMapper);
  const [loading, setLoading] = useState(false);
  const [xPos, setXPos] = useState(100);
  const [yPos, setYPos] = useState(130);

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
    }, 200000);

    setInterval(() => {
      setXPos(prevXPos => {
        if (prevXPos + 5 <= 256) {
          return prevXPos + 3;
        }
        return prevXPos;
      });
      setYPos(prevYPos => {
        if (prevYPos + 5 <= 256) {
          return prevYPos + 3;
        }
        return prevYPos;
      });
    }, 1000);
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const renderSteps = () => {
    // Show View when loading is true
    if (loading) {
      return (
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../assets/48401-ox-lantern-zodiac-lunar-new-year-2021.json')}
          animationStyle={styles.lottie}
          speed={1}
        >
          <Text style={styles.waitText}>Wait a moment ...</Text>
        </AnimatedLoader>
      );
    }

    // Show View when image has been uploaded
    if (image) {
      return (
        <View>
          <View style={styles.topSection}>
            <Text style={styles.topSectionFont}>
              User Position: Living Room 1
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <View style={styles.flexRow}>
              {roomnums.map(roomCol => (
                <View>
                  {roomCol.map(roomNum => (
                    <View style={styles.room(roomNum, colorMapper)}></View>
                  ))}
                </View>
              ))}

              <View style={styles.userIcon(xPos, yPos)}>
                <LottieView
                  source={require('../../assets/5291-simple-radar-blink-animation-for-lottie.json')}
                  autoPlay
                  loop
                />
              </View>
            </View>
          </View>

          <RoomLegends />
        </View>
      );
    }

    // Show Warning when image hasnt been uploaded
    return (
      <View>
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 0 }}>
          <LottieView
            source={require('../../assets/5081-empty-box.json')}
            autoPlay
            loop={false}
            style={styles.emptyBox}
          />
        </View>
        <Text style={styles.setupReminder}>
          Looks like no floor plan has been uploaded. Please setup floor plan at
          Setup Tab.
        </Text>
      </View>
    );
  };

  return <View style={styles.container}>{renderSteps()}</View>;
};

const styles = StyleSheet.create({
  emptyBox: {
    height: 200,
  },
  setupReminder: {
    padding: 29,
    fontSize: 15,
  },
  userIcon: (xPos, yPos) => ({
    width: userLocationBoxSize,
    height: userLocationBoxSize,
    position: 'absolute',
    top: xPos - userLocationBoxSize / 2, // (userLocationBoxSize / 2) is for the offset, so that icon start at center correctly
    left: yPos - userLocationBoxSize / 2,
  }),
  topSectionFont: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 17.5,
  },
  topSection: {
    marginTop: 30,
  },
  waitText: {
    fontWeight: '400',
    fontSize: 15.5,
  },
  lottie: {
    width: 300,
    height: 300,
  },
  uploadBox: {
    borderWidth: 2,
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  uploadIcon: {
    fontSize: 40,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  mapContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#6666ff',
    display: 'flex',
    alignItems: 'center',
  },
  room: (roomNum, colorMapper) => ({
    width: 2,
    height: 2,
    backgroundColor: colorMapper[roomNum] ? colorMapper[roomNum] : 'white',
  }),
});

export default TrackingTab;
