import React from "react";

import { Icon } from "native-base";
import { StyleSheet, Image, Text, View } from "react-native";

const RoomStats = ({ name }) => {
  return (
    <View style={styles.roomStatsContainer}>
      <Icon name={name} style={styles.icon} />
      <Text>testing</Text>
    </View>
  );
};

const RoomStatsBar = ({ icon, stats, category }) => {
  return (
    <View style={styles.container}>
      <RoomStats name="thermometer" />
      <RoomStats name="water" />
      <RoomStats name="md-flashlight" />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
    opacity: 0.7,
  },
  roomStatsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  container: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 10,
  },
});

export default RoomStatsBar;
