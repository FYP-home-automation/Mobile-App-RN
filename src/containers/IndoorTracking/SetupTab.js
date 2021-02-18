import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import data from '../../assets/rooms.json';
import { roomNumColorMapper } from 'HomeAutomation/src/utils/global';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import AnimatedLoader from 'react-native-animated-loader';

const SetupTab = ({ image, setImage }) => {
  const roomnums = data.roomnums;
  const [colorMapper, setColorMapper] = useState(roomNumColorMapper);
  const [loading, setLoading] = useState(false);

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
    if (image) {
      return (
        <View style={styles.flexRow}>
          {roomnums.map(roomCol => (
            <View>
              {roomCol.map(roomNum => (
                <View style={styles.room(roomNum, colorMapper)}></View>
              ))}
            </View>
          ))}
        </View>
      );
    }
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

  return (
    <View style={styles.container}>
      {loading ? (
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../assets/48401-ox-lantern-zodiac-lunar-new-year-2021.json')}
          animationStyle={styles.lottie}
          speed={1}
        >
          <Text>Doing something...</Text>
        </AnimatedLoader>
      ) : (
        renderSteps()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#ff4081',
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
