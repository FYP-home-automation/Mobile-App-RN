import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Switch } from 'react-native';

import { roomNumColorMapper } from 'HomeAutomation/src/utils/global';
import { RoomLegends } from 'HomeAutomation/src/components';

import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import AnimatedLoader from 'react-native-animated-loader';
import WS from 'react-native-websocket';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';

const userLocationBoxSize = 40;

const initialData = [
  {
    name: 'Person A',
    controlStatus: true,
  },
  {
    name: 'Person B',
    controlStatus: false,
  },
  {
    name: 'Person C',
    controlStatus: false,
  },
];

const TrackingTab = ({ image, setImage, data }) => {
  // const roomnums = data.roomtypes;
  const [colorMapper, setColorMapper] = useState(roomNumColorMapper);
  const [xPos, setXPos] = useState(100);
  const [yPos, setYPos] = useState(130);
  const [devices, setDevices] = useState(initialData);

  // useEffect(() => {
  //   setInterval(() => {
  //     const dummyColor = [
  //       '#FFA500',
  //       '#0000FF',
  //       '#800080',
  //       '#808080',
  //       '#00FFFF',
  //     ];
  //     const newColorMapper = { ...colorMapper };

  //     for (let i = 1; i < 8; i++) {
  //       const color = dummyColor[getRandomInt(0, 4)];
  //       newColorMapper[i] = color;
  //     }

  //     setColorMapper(newColorMapper);
  //   }, 200000);

  //   setInterval(() => {
  //     setXPos(prevXPos => {
  //       if (prevXPos + 5 <= 256) {
  //         return prevXPos + 3;
  //       }
  //       return prevXPos;
  //     });
  //     setYPos(prevYPos => {
  //       if (prevYPos + 5 <= 256) {
  //         return prevYPos + 3;
  //       }
  //       return prevYPos;
  //     });
  //   }, 1000);
  // }, []);

  useEffect(() => {
    console.log('inside');
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

  const renderSteps = () => {
    // Show View when image has been uploaded
    if (data.roomnums) {
      return (
        <View>
          <View style={styles.topSection}>
            <Text style={styles.topSectionFont}>
              User Position: Living Room 1
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <View style={styles.flexRow}>
              {data.roomnums.map(roomCol => (
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
            // ref={ref => {
            //   this.ws = ref;
            // }}
            url="wss://aqueous-depths-15794.herokuapp.com/ws/polData/"
            onOpen={() => {
              console.log('Open!');
              // this.ws.send('Hello');
            }}
            onMessage={e => console.log(e)}
            onError={console.log}
            onClose={console.log}
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

const mapStateToProps = ({ tracking, room }) => ({
  data: tracking.data,
});

export default connect(mapStateToProps, {})(TrackingTab);
