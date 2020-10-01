import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

const DeviceBox = ({ name, type, on }) => {
  const renderIcon = () => (
    <View style={styles.icon}>
      <Icon name={type} />
    </View>
  );
  const renderStatus = () => <Text>ON</Text>;
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.inline}>
          {renderIcon()}
          {renderStatus()}
        </View>
        <Text> {name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  container: {
    backgroundColor: "#05FFD2",
    width: 85,
    height: 85,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
});

export default DeviceBox;
