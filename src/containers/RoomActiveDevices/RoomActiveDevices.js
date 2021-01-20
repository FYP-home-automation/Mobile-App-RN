import React, { useState } from 'react';

import { DeviceBox } from 'HomeAutomation/src/components';
import { StyleSheet, Text, View } from 'react-native';

const initialDummyData = [
  {
    type: 'ios-trash',
    name: 'light 1',
    on: false,
    id: 1,
  },
  {
    type: 'paper-plane',
    name: 'trashbin',
    on: true,
    id: 2,
  },
  {
    type: 'ios-bulb',
    name: 'printer',
    on: true,
    id: 3,
  },
  {
    type: 'tv',
    name: 'tv',
    on: true,
    id: 4,
  },
  {
    type: 'ios-bulb',
    name: 'light 2',
    on: true,
    id: 5,
  },
];

const RoomActiveDevices = ({ icon, stats, category }) => {
  const [dummyData, setDummyData] = useState(initialDummyData);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5 Active Devices</Text>
      <View style={styles.deviceBoxContainer}>
        {dummyData.map((data, id) => (
          <View>
            <DeviceBox
              name={data.name}
              type={data.type}
              on={data.on}
              onPress={() => {
                console.log(id);
                // const targetIdx = dummyData.findIndex(device => device.id == id)
                const newData = [...dummyData];
                newData[id].on = !newData[id].on;
                setDummyData(newData);
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
