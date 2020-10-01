import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

import {
  HomeScreen,
  RoomScreen,
  UsageGraphScreen,
} from "HomeAutomation/src/screens";
import { Home, Room, UsageGraph } from "HomeAutomation/src/constants";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={Home}
      >
        <Stack.Screen name={Home} component={HomeScreen} />
        <Stack.Screen name={Room} component={RoomScreen} />
        <Stack.Screen name={UsageGraph} component={UsageGraphScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
