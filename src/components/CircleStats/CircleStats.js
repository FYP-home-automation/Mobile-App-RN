import React from "react";

import { CircleIcon } from "HomeAutomation/src/components";
import { StyleSheet, Image, Text, View, Button } from "react-native";

const CircleStats = ({ icon, stats, category }) => {
  return (
    <View style={styles.container}>
      <CircleIcon icon={icon} />
      <View style={styles.categoryContainer}>
        <Text style={styles.stats}>{stats}</Text>
        <Text style={styles.stats}>{category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stats: {
    margin: 0,
  },
  categoryContainer: {
    justifyContent: "center",
    marginLeft: 20,
  },
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  circle: {
    height: 80,
    width: 80,
    backgroundColor: "#05FFD2",
    borderRadius: 50,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default CircleStats;
