import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

import {
  HomeScreen,
  RoomScreen,
  UsageGraphScreen,
} from "HomeAutomation/src/screens";
import { StyleSheet, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Room" component={RoomScreen} />
        <Stack.Screen name="Usage Graph" component={UsageGraphScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
