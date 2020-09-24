import React from "react";

import { StyleSheet, Text, View, Button } from "react-native";
import Carousel from "react-native-snap-carousel";

const dummyState = [
  {
    title: "Item 1",
    text: "Text 1",
  },
  {
    title: "Item 2",
    text: "Text 2",
  },
  {
    title: "Item 3",
    text: "Text 3",
  },
  {
    title: "Item 4",
    text: "Text 4",
  },
  {
    title: "Item 5",
    text: "Text 5",
  },
];

const LivingSpaces = () => {
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          height: 215,
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Living Spaces</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
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
  container: {},
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 30,
  },
});

export default LivingSpaces;
