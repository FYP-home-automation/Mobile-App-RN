import React from 'react';

import livingRoom from 'HomeAutomation/src/assets/livingRoom.png';
import { RoomStatsBar, RoomActiveDevices } from 'HomeAutomation/src/containers';
import { capitalize } from 'HomeAutomation/src/utils/global';

import { Icon } from 'native-base';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

const RoomScreen = ({ navigation, activeRoomId, roomList }) => {
  const room = Number.isInteger(activeRoomId) ? roomList[activeRoomId] : null;
  const temp = 24;
  const humidity = 8;
  const brightness = 20;
  // TODO: dynamic reading for stats, e.g temp, humidity
  // TODO: dynamic devices on/off status
  // TODO: dynamic room type
  return (
    <View>
      <ImageBackground style={styles.image} source={livingRoom}>
        <View style={styles.child}>
          <SafeAreaView>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" style={styles.backButtonIcon} />
            </TouchableOpacity>
            <View styles={styles.nameContainer}>
              <Text style={styles.roomName}>{capitalize(room.name)}</Text>
              <Text style={styles.roomType}>Living Room</Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
      <RoomStatsBar temp={temp} humidity={humidity} brightness={brightness} />
      <RoomActiveDevices room={room} />
    </View>
  );
};

const mapStateToProps = ({ room }) => ({
  activeRoomId: room.activeRoomId,
  roomList: room.roomList,
});

const styles = StyleSheet.create({
  roomType: {
    color: '#ffff',
    fontWeight: '600',
    fontSize: 15,
    opacity: 0.9,
    textAlign: 'center',
  },
  roomName: {
    color: '#ffff',
    fontWeight: '600',
    fontSize: 23,
    opacity: 0.9,
    textAlign: 'center',
  },
  backButtonIcon: {
    color: '#ffff',
  },
  button: {
    paddingLeft: 20,
  },
  image: {
    width: '100%',
    height: 210,
    resizeMode: 'cover',
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default connect(mapStateToProps, null)(RoomScreen);
