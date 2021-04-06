import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import defaultData from '../../assets/rooms.json';
import {
  roomNumColorMapper,
  colorMapperList,
} from 'HomeAutomation/src/utils/global';
import { RoomLegends } from 'HomeAutomation/src/components';

import { Icon, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import AnimatedLoader from 'react-native-animated-loader';
import DropDownPicker from 'react-native-dropdown-picker';
import Draggable from 'react-native-draggable';
import { connect } from 'react-redux';
import {
  setLength,
  setWidth,
  setFloorPlan,
  setLoading,
  setRoomNum,
} from 'HomeAutomation/src/redux/actions';
import axios from 'axios';

const xOffset = 61.5;
const yOffset = 280;

const SetupTab = ({
  setImage,
  setWidth,
  setLength,
  setFloorPlan,
  setLoading,
  setRoomNum,
  loading,
  width,
  length,
  data,
  roomList,
  roomNum,
}) => {
  const [colorMapper, setColorMapper] = useState(roomNumColorMapper);
  // const [loading, setLoading] = useState(false);
  const [locA, setLocA] = useState({ x: 0, y: 0 });
  const [locB, setLocB] = useState({ x: 0, y: 0 });
  const [locC, setLocC] = useState({ x: 0, y: 0 });

  // console.log('data ', data);

  // useEffect(() => {
  //   console.log('testing');
  // }, []);

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
        const locY = 256 - (e.nativeEvent.pageY - yOffset);
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

  const roomRow = (room, id) => {
    console.log(roomNum);
    const colorMapperListModified = colorMapperList.slice(0, roomNum);
    console.log(colorMapperListModified);
    return (
      <View style={styles.roomCard(id)}>
        <Text>{room.name}</Text>
        <DropDownPicker
          items={colorMapperListModified}
          defaultValue={'orange'}
          containerStyle={{ height: 29 }}
          dropDownMaxHeight={80}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          arrowStyle={{ height: 15 }}
          dropDownStyle={{
            backgroundColor: '#fafafa',
            zIndex: 6000,
          }}
          onChangeItem={item => console.log(item)}
        />
      </View>
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setLoading(true);
      // console.log(result.uri);
      setImage(result.uri);

      // Step 1. Upload Image
      let formdata = new FormData();
      formdata.append('raw_floor_plan', {
        uri: result.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      const response = await axios.post(
        'http://18.136.85.164/api/floorplan',
        formdata
      );

      // console.log('response', response.data);

      const pathArr = response.data.raw_floor_plan.split('/');
      const image_name = pathArr[pathArr.length - 1];

      // Step 2. Post Image
      let formdata2 = new FormData();
      formdata2.append('image_name', image_name);
      // console.log('formdata 2', formdata2);
      const response2 = await axios.post(
        'http://18.136.85.164/deepfloorplan',
        formdata2
      );
      // console.log('response2', response2.data);

      const nameArr = image_name.split('.');
      const nameOnly = nameArr[0];

      // Step 3. Check Record
      const response3 = await axios.get(
        `http://18.136.85.164/media/outputs/${nameOnly}.json`
      );

      const data = response3.data;
      // console.log('response3', response3.data);
      const defaultFloorPlanTypes = {
        roomdict: {
          4: 'bedroom',
          3: 'living room',
          5: 'hall',
          2: 'bathroom',
        },
      };

      // Step 3. Check How many Room Detected
      const response4 = await axios.get(
        `http://18.136.85.164/media/room_json_to_room/${nameOnly}.json`
      );

      const roomNum = Object.entries(response4.data).length - 1;

      setRoomNum(roomNum);
      setFloorPlan({ ...data, ...defaultFloorPlanTypes });
      setLoading(false);
    }
  };

  const onSubmit = () => {
    console.log('A, x: ', locA.x, ',y: ', locA.y);
    console.log('B, x: ', locB.x, ',y: ', locB.y);
    console.log('C, x: ', locC.x, ',y: ', locC.y);

    // real length: (locX/256) * length
  };

  const renderSteps = () => {
    // Show View when loading is true
    // console.log('loading ', loading);
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
    if (data.roomnums) {
      return (
        <View>
          <View style={styles.topSection}>
            <Text style={styles.topSectionFont}>Uploaded Floor Plan</Text>
          </View>
          <View style={styles.mapContainer}>
            <View>
              <View style={styles.flexRow}>
                {data.roomnums.map(roomCol => (
                  <View>
                    {roomCol.map(roomNum => (
                      <View style={styles.room(roomNum, colorMapper)}></View>
                    ))}
                  </View>
                ))}
              </View>
              {DragIcon(0, 256 - 25, 'A')}
              {DragIcon(26, 256 - 25, 'B')}
              {DragIcon(52, 256 - 25, 'C')}
            </View>
          </View>
          <View style={styles.roomMapper}>
            <Text style={styles.roomMapperTitle}>Room Mapper</Text>
            <View style={styles.scrollView}>
              {roomList.map((room, id) => roomRow(room, id))}
            </View>
          </View>
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
            // setLoading(true);
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
  roomCard: id => ({
    height: 31,
    flexDirection: 'row',
    // borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10 - id,
    marginBottom: 5,
    position: 'relative',
  }),
  roomMapperTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 20,
  },
  roomMapper: {
    // height: 200,
    position: 'relative',
  },
  scrollView: {
    backgroundColor: '#3eeaed',
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
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
    // zIndex: -10,
    position: 'relative',
  },
  room: (roomNum, colorMapper) => ({
    width: 2,
    height: 2,
    backgroundColor: colorMapper[roomNum] ? colorMapper[roomNum] : 'white',
  }),
});

const mapDispatchToProps = {
  setLength,
  setWidth,
  setFloorPlan,
  setLoading,
  setRoomNum,
};

const mapStateToProps = ({ tracking, room }) => ({
  length: tracking.length,
  width: tracking.width,
  data: tracking.data,
  loading: tracking.loading,
  roomList: room.roomList,
  roomNum: tracking.roomNum,
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupTab);
