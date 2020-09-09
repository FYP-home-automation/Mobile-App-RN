import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! ytjg</Text>
      <Text>Open up App.js to start working on your app! ytjg</Text>
      <Text>{count}</Text>
      <Button title="testing" onPress={() => setCount(count + 1)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
