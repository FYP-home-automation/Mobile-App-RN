import React, { useState } from 'react';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';

import { DeviceBox } from 'HomeAutomation/src/components';
import { StyleSheet, Text, View } from 'react-native';
import { DeviceModal } from 'HomeAutomation/src/components';

const RoomActiveDevices = ({ room }) => {
  const devices = room.gateways.map(gateway => gateway.devices);
  const [modalVisible, setModalVisible] = useState(false);

  if (devices.length <= 0) {
    return null;
  }

  // TODO: Integrate With Back-end
  return (
    <View style={styles.flexStyle}>
      <View style={styles.container}>
        <View style={styles.roomDeviceTopSection}>
          <Text style={styles.title}>5 Active Devices</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="ios-add-circle-outline" style={styles.addButtonIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.deviceBoxContainer, ...styles.flexStyle }}>
          {devices[0].map(device => (
            <DeviceBox
              name={device.name}
              type={device.device_type}
              on={true}
              onPress={() => {
                // const newData = [...dummyData];
                // newData[id].on = !newData[id].on;
                // setDummyData(newData);
              }}
            />
          ))}
        </View>
      </View>
      <DeviceModal
        modalVisible={modalVisible}
        onClose={state => setModalVisible(state)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexStyle: {
    display: 'flex',
    alignItems: 'center',
  },
  addButtonIcon: {
    marginRight: 17,
  },
  roomDeviceTopSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    // padding: 20,
    display: 'flex',
    borderColor: 'black',
    // borderWidth: 1,
    width: '90%',
    marginTop: 10,
  },
  deviceBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default RoomActiveDevices;
