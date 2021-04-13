import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Switch } from 'react-native';

import { roomNumColorMapper } from 'HomeAutomation/src/utils/global';
import { RoomLegends } from 'HomeAutomation/src/components';

import room_fill_data from '../../assets/rooms_fill.json';
import WS from 'react-native-websocket';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';

const userLocationBoxSize = 40;

const initialData = [
  {
    name: 'Person A',
    controlStatus: true,
  },
  // {
  //   name: 'Person B',
  //   controlStatus: false,
  // },
  // {
  //   name: 'Person C',
  //   controlStatus: false,
  // },
];

const TrackingTab = ({
  data,
  roomNum,
  roomNumToType,
  length,
  width,
  roomIdToNumMapper,
  roomList,
}) => {
  const room_fill = room_fill_data.roomnums;
  const [colorMapper, setColorMapper] = useState(roomNumColorMapper);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [devices, setDevices] = useState(initialData);
  const [roomNumToColor, setRoomNumToColor] = useState({});
  const [changeRoomMapper, setChangeRoomMapper] = useState({});
  const [roomNumToName, setRoomNumToName] = useState({});
  const [roomLocName, setRoomLocName] = useState('');

  const roomArr = Object.values(roomNumToType);
  const uniqueRoomArr = [...new Set(roomArr)];

  useEffect(() => {
    const typeToColor = {};
    const roomNumToColorTemp = {};
    for (let i = 1; i <= uniqueRoomArr.length; i++) {
      typeToColor[uniqueRoomArr[i - 1]] = roomNumColorMapper[i];
    }

    for (const roomNum in roomNumToType) {
      const roomType = roomNumToType[roomNum];
      roomNumToColorTemp[roomNum] = typeToColor[roomType];
    }
    roomNumToColorTemp[0] = 'black';

    setRoomNumToColor(roomNumToColorTemp);
    setChangeRoomMapper(roomNumToColorTemp);

    const obj = {};

    roomList.forEach(room => {
      const roomname = room.name;
      const id = room._id;
      const num = roomIdToNumMapper[id];
      obj[num] = roomname;
    });

    setRoomNumToName(obj);
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const activeDevice = (device, id) => {
    const toogleSwitch = () => {
      const newActiveDevices = [...devices];
      newActiveDevices[id].controlStatus = !newActiveDevices[id].controlStatus;
      setDevices(newActiveDevices);
    };

    return (
      <View style={styles.activeCard}>
        <Text>{device.name}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#2a74b5' }}
          ios_backgroundColor="#3e3e3e"
          style={styles.switch}
          value={device.controlStatus}
          onValueChange={() => toogleSwitch()}
        ></Switch>
      </View>
    );
  };

  const updateLocation = e => {
    const data = JSON.parse(e.data);
    // const data = {
    //   distance: 'dummy',
    // };
    if (data.distance) {
      const { x_cor, y_cor } = data.coordinates;
      // const x_cor = 21.3;
      // const y_cor = 20.7;

      const newXCor = (x_cor / length) * 256;
      const newYCor = (y_cor / width) * 256;

      // const newYCor = y_cor/width * 64;
      if (newXCor < 0) {
        setXPos(0);
      } else if (newXCor > 256) {
        setXPos(256);
      } else {
        setXPos(newXCor);
      }

      if (newYCor < 0) {
        setYPos(0);
      } else if (newYCor > 256) {
        setYPos(256);
      } else {
        setYPos(newYCor);
      }

      const xIndex = Math.floor((x_cor / length) * 64);
      const yIndex = Math.floor(((width - y_cor) / width) * 64);
      //note or 64 - yIndex
      const curRoom = room_fill[xIndex][yIndex];

      //change name room according to position
      const targetRoomName = roomNumToName[curRoom];
      setRoomLocName(targetRoomName);

      //change color of room
      const temp = { ...roomNumToColor };
      temp[curRoom] = 'indigo';
      setChangeRoomMapper(temp);
    }
  };

  const renderSteps = () => {
    // Show View when image has been uploaded
    if (data.roomnums) {
      return (
        <View>
          <View style={styles.topSection}>
            <Text style={styles.topSectionFont}>
              {`User Position: ${roomLocName}`}
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <View style={styles.flexRow}>
              {data.roomnums.map(roomCol => (
                <View>
                  {roomCol.map(roomNum => (
                    <View style={styles.room(roomNum, changeRoomMapper)}></View>
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

          <RoomLegends roomNum={roomNum} roomNumToType={roomNumToType} />

          <View style={styles.controllerSection}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.control}>
              <Text style={styles.controllerTitle}>Controller</Text>
              <ScrollView style={styles.scrollView}>
                {/* {activeDevice('Person A', true)}
                {activeDevice('Person B', false)} */}
                {devices.map((device, id) => activeDevice(device, id))}
              </ScrollView>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
          <WS
            url="wss://aqueous-depths-15794.herokuapp.com/ws/polData/"
            onOpen={() => {
              console.log('Open!');
              // updateLocation();
              // this.ws.send('Hello');
            }}
            onMessage={e => updateLocation(e)}
            // onError={e => console.log('error ', e)}
            onClose={e => console.log('onClose ', e)}
            reconnect // Will try to reconnect onClose
          />
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
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  activeCard: {
    borderRadius: 5,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controllerTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  scrollView: {
    backgroundColor: '#3eeaed',
    height: '20%',
    borderRadius: 5,
    marginTop: 10,
  },
  control: {
    flex: 5,
  },
  controllerSection: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
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
    left: xPos - userLocationBoxSize / 2, // (userLocationBoxSize / 2) is for the offset, so that icon start at center correctly
    bottom: yPos - userLocationBoxSize / 2,
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
    width: 4,
    height: 4,
    backgroundColor: colorMapper[roomNum] ? colorMapper[roomNum] : 'white',
  }),
});

const mapStateToProps = ({ tracking, room }) => ({
  data: tracking.data,
  roomNum: tracking.roomNum,
  roomNumToType: tracking.roomNumToType,
  length: tracking.length,
  width: tracking.width,
  roomIdToNumMapper: tracking.roomIdToNumMapper,
  roomList: room.roomList,
});

export default connect(mapStateToProps, {})(TrackingTab);
