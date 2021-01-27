import React from 'react';

import { RoomStatsBar, RoomActiveDevices } from 'HomeAutomation/src/containers';
import {
  capitalize,
  roomTypeImageMapper,
} from 'HomeAutomation/src/utils/global';

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
  return (
    <View>
      <ImageBackground
        style={styles.image}
        source={roomTypeImageMapper[room?.room_type]}
      >
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
              <Text style={styles.roomType}>
                {room?.room_type !== 'None' ? room.room_type : 'Room'}
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
      <RoomStatsBar temp={temp} humidity={humidity} brightness={brightness} />
      <RoomActiveDevices room={room} activeRoomId={activeRoomId} />
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
