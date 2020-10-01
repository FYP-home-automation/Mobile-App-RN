import React from "react";
import { StyleSheet, View } from "react-native";

import { Container, Content, Button, Text } from "native-base";

import { UsageGraph } from "../constants";
import { CircleStats } from "HomeAutomation/src/components";
import { Header, LivingSpaces } from "HomeAutomation/src/containers";
import electricity from "HomeAutomation/src/assets/electricity.png";
import livingRoom from "HomeAutomation/src/assets/livingRoom.png";
import bill from "HomeAutomation/src/assets/bill.png";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Header />
      <View style={styles.stats}>
        <CircleStats
          icon={electricity}
          stats="75.3 kwh"
          category={"Today - Power Usage"}
        />
        <CircleStats
          icon={bill}
          stats="$ 202.13"
          category={"This Month Potential Bill"}
        />
      </View>
      <LivingSpaces navigation={navigation} />
      <View style={styles.usageGraphContainer}>
        <Button
          onPress={() => navigation.navigate(UsageGraph)}
          style={styles.usageGraphButton}
          title="See Usage Graph"
        >
          <Text style={styles.usageGraphText}>See Usage Graph</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  usageGraphText: {
    fontWeight: "600",
  },
  usageGraphButton: {
    backgroundColor: "#05FFD2",
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
  },
  usageGraphContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 25,
  },
  stats: {
    paddingTop: 20,
    paddingLeft: 35,
  },
});

export default HomeScreen;
