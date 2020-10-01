import React from "react";

import { DeviceBox } from "HomeAutomation/src/components";
import { Icon } from "native-base";
import { StyleSheet, Image, Text, View } from "react-native";

const dummyData = [
  {
    type: "ios-trash",
    name: "light 1",
    on: true,
  },
  {
    type: "paper-plane",
    name: "trashbin",
    on: true,
  },
  {
    type: "ios-bulb",
    name: "printer",
    on: true,
  },
  {
    type: "tv",
    name: "tv",
    on: true,
  },
  {
    type: "ios-bulb",
    name: "light 2",
    on: true,
  },
];

const RoomActiveDevices = ({ icon, stats, category }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>5 Active Devices</Text>
      <View style={styles.deviceBoxContainer}>
        {dummyData.map((data) => (
          <View>
            <DeviceBox name={data.name} type={data.type} on={data.on} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    padding: 20,
  },
  deviceBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default RoomActiveDevices;
