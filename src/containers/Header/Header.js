import React from "react";

import { StyleSheet, Text, View, Button } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.welcome, ...styles.welcomeName }}>
        Hello Karuna,
      </Text>
      <Text style={styles.welcome}>I am Home Max</Text>
      <Text style={styles.welcome}>your Smart Home System</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "35%",
    backgroundColor: "#05FFD2",
    justifyContent: "center",
  },
  welcome: {
    fontWeight: "600",
    paddingLeft: "10%",
  },
  welcomeName: {
    fontSize: 18,
  },
});

export default Header;
