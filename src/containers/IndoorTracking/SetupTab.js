import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import data from '../../assets/rooms.json';
import { roomNumColorMapper } from 'HomeAutomation/src/utils/global';
import { RoomLegends } from 'HomeAutomation/src/components';

import { Icon, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import AnimatedLoader from 'react-native-animated-loader';
import Draggable from 'react-native-draggable';
import { connect } from 'react-redux';
import { setLength, setWidth } from 'HomeAutomation/src/redux/actions';

const xOffset = 61.5;
const yOffset = 280;

const SetupTab = ({ image, setImage, setWidth, setLength, width, length }) => {
  const roomnums = data.roomtypes;
  const [colorMapper, setColorMapper] = useState(roomNumColorMapper);
  const [loading, setLoading] = useState(false);
  const [locA, setLocA] = useState({ x: 0, y: 0 });
  const [locB, setLocB] = useState({ x: 0, y: 0 });
  const [locC, setLocC] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Note: example to randomize Color
    //
    // setInterval(() => {
    //   const dummyColor = [
    //     '#FFA500',
    //     '#0000FF',
    //     '#800080',
    //     '#808080',
    //     '#00FFFF',
    //   ];
    //   const newColorMapper = { ...colorMapper };
    //   for (let i = 1; i < 8; i++) {
    //     const color = dummyColor[getRandomInt(0, 4)];
    //     newColorMapper[i] = color;
    //   }
    //   setColorMapper(newColorMapper);
    // }, 200000);
  }, []);

  const DragIcon = (x, y, char) => (
    <Draggable
      x={x}
      y={y}
      minX={0}
      minY={0}
      maxX={256}
      maxY={256}
      renderSize={25}
      renderColor="red"
      renderText={char}
      onRelease={e => {
        const locX = e.nativeEvent.pageX - xOffset;
        const locY = e.nativeEvent.pageY - yOffset;
        if (char == 'A') {
          setLocA({ x: locX, y: locY });
        } else if (char == 'B') {
          setLocB({ x: locX, y: locY });
        } else if (char == 'C') {
          setLocC({ x: locX, y: locY });
        } else {
          console.log('unidentified char');
        }
        return e;
      }}
    />
  );

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

  const onSubmit = () => {
    console.log('A, x: ', locA.x, ',y: ', locA.y);
    console.log('B, x: ', locB.x, ',y: ', locB.y);
    console.log('C, x: ', locC.x, ',y: ', locC.y);
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
            <View>
              <View style={styles.flexRow}>
                {roomnums.map(roomCol => (
                  <View>
                    {roomCol.map(roomNum => (
                      <View style={styles.room(roomNum, colorMapper)}></View>
                    ))}
                  </View>
                ))}
              </View>
              {DragIcon(0, 0, 'A')}
              {DragIcon(26, 0, 'B')}
              {DragIcon(52, 0, 'C')}
            </View>
          </View>

          <RoomLegends />
          <View style={styles.submitContainer}>
            <Button style={styles.submitButton} onPress={() => onSubmit()}>
              <Text style={styles.submitText}>Submit Location</Text>
            </Button>
          </View>
        </View>
      );
    }

    // Show View when image has not been uploaded/ uploading image screen
    return (
      <>
        <View style={styles.floorPlanSize}>
          <Text style={styles.sizeTitle}>Enter your floor plan size: </Text>
          <View style={styles.flexRowContainer}>
            <Text style={styles.sizeType}>Length: </Text>
            <TextInput
              style={styles.textInput}
              value={length}
              onChangeText={val => setLength(parseInt(val))}
              keyboardType="numeric"
            ></TextInput>
            <Text style={styles.unitType}>m</Text>
          </View>
          <View style={styles.flexRowContainer}>
            <Text style={styles.sizeType}>Width: </Text>
            <TextInput
              style={styles.textInput}
              value={width}
              onChangeText={val => setWidth(parseInt(val))}
              keyboardType="numeric"
            ></TextInput>
            <Text style={styles.unitType}>m</Text>
          </View>
        </View>
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
      </>
    );
  };

  return <View style={styles.container}>{renderSteps()}</View>;
};

const styles = StyleSheet.create({
  unitType: {
    marginLeft: 10,
  },
  sizeType: {
    width: 60,
  },
  flexRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 4,
    width: 120,
  },
  sizeTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  floorPlanSize: {
    width: '60%',
    marginTop: 40,
  },
  submitContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  submitButton: {
    backgroundColor: '#05FFD2',
  },
  submitText: {
    padding: 10,
  },
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
    marginTop: 50,
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
  },
  mapContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#6666ff',
    display: 'flex',
    alignItems: 'center',
  },
  room: (roomNum, colorMapper) => ({
    width: 4,
    height: 4,
    backgroundColor: colorMapper[roomNum] ? colorMapper[roomNum] : 'white',
  }),
});

const mapDispatchToProps = {
  setLength,
  setWidth,
};

const mapStateToProps = ({ tracking }) => ({
  length: tracking.length,
  width: tracking.width,
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupTab);
