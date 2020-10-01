import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { Room } from "HomeAutomation/src/constants";
import Carousel from "react-native-snap-carousel";
import livingRoom from "HomeAutomation/src/assets/livingRoom.png";
import kitchen from "HomeAutomation/src/assets/kitchen.png";

const dummyState = [
  {
    room: "Living Room",
    devices: 4,
    source: livingRoom,
  },
  {
    room: "Kitchen",
    devices: 5,
    source: kitchen,
  },
  {
    room: "Living Room",
    devices: 3,
    source: livingRoom,
  },
  {
    room: "Kitchen",
    devices: 5,
    source: kitchen,
  },
  {
    room: "Living Room",
    devices: 2,
    source: livingRoom,
  },
];

const LivingSpaces = ({ navigation }) => {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(Room)}>
        <ImageBackground
          source={item.source}
          style={styles.imageBackground}
          imageStyle={{ borderRadius: 15 }}
        >
          <Text style={styles.roomName}>{item.room}</Text>
          <Text style={styles.devices}>{item.devices} Devices Present</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Living Spaces</Text>
      <View style={styles.carousel}>
        <Carousel
          layout={"default"}
          data={dummyState}
          sliderWidth={260}
          itemWidth={260}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  devices: {
    color: "white",
    fontWeight: "500",
  },
  roomName: {
    color: "white",
    fontWeight: "600",
  },
  carousel: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  imageBackground: {
    height: 215,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: "flex-end",
    padding: 10,
  },
  container: {},
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 30,
  },
});

export default LivingSpaces;
