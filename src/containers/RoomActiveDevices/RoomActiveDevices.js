import React, { useState } from 'react';

import { DeviceBox } from 'HomeAutomation/src/components';
import { StyleSheet, Text, View } from 'react-native';

const RoomActiveDevices = ({ room }) => {
  const devices = room.gateways.map(gateway => gateway.devices);

  if (devices.length <= 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5 Active Devices</Text>
      <View style={styles.deviceBoxContainer}>
        {devices[0].map((device, id) => (
          <View>
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
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    padding: 20,
  },
  deviceBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default RoomActiveDevices;
