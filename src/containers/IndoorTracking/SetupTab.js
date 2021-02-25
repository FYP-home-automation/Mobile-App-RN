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

const SetupTab = ({ image, setImage }) => {
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
            <Text style={styles.topSectionFont}>Setup Instruction:</Text>
          </View>
          <View style={styles.outerInstructionBox}>
            <View style={styles.instructionBox}>
              <Text>1. Place Bluetooth Tower location to correct location</Text>
              <Text>2. Submit location and go to tracking tab</Text>
            </View>
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
            </View>
          </View>

          <RoomLegends />
        </View>
      );
    }

    // Show View when image has not been uploaded/ uploading image screen
    return (
      <TouchableOpacity
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            pickImage();
          }, 50);
        }}
        style={styles.topMargin}
      >
        <View style={styles.uploadBox}>
          <Icon style={styles.uploadIcon} name="md-cloud-upload" />
          <Text>Upload your Floorplan here</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return <View style={styles.container}>{renderSteps()}</View>;
};

const styles = StyleSheet.create({
  outerInstructionBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  instructionBox: {
    width: '70%',
  },
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
  topMargin: {
    marginTop: 100,
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

export default SetupTab;
