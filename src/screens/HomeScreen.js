import React from "react";

import { CircleStats } from "HomeAutomation/src/components";
import { Header } from "HomeAutomation/src/containers";
import { StyleSheet, Text, View, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Header />
      <View style={styles.stats}>
        <CircleStats />
        <CircleStats />
      </View>
      <Button
        onPress={() => navigation.navigate("Room")}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stats: {
    paddingTop: 20,
    paddingLeft: 35,
  },
});

export default HomeScreen;
