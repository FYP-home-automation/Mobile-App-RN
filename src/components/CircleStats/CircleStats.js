import React from "react";

import testing from "../../assets/flash_on_24px.png";
import SvgUri from "react-native-svg-uri";

import { StyleSheet, Image, Text, View, Button } from "react-native";

const CircleStats = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Image style={styles.image} source={testing}></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
