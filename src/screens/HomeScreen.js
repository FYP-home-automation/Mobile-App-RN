import React from "react";

import { CircleStats } from "HomeAutomation/src/components";
import { Header, LivingSpaces } from "HomeAutomation/src/containers";
import electricity from "HomeAutomation/src/assets/electricity.png";
import bill from "HomeAutomation/src/assets/bill.png";
import { StyleSheet, Text, View, Button } from "react-native";

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
      <LivingSpaces />
      <Button
        onPress={() => navigation.navigate("Room")}
        title="See Usage Graph"
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
