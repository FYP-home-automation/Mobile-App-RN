import React from "react";

import livingRoom from "HomeAutomation/src/assets/livingRoom.png";
import { RoomStatsBar, RoomActiveDevices } from "HomeAutomation/src/containers";
import { Button, Icon } from "native-base";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const RoomScreen = ({ icon, navigation }) => {
  return (
    <>
      <View>
        <ImageBackground style={styles.image} source={livingRoom}>
          <View style={styles.child}>
            <SafeAreaView>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" style={styles.backButtonIcon} />
              </TouchableOpacity>
              <View styles={styles.nameContainer}>
                <Text style={styles.roomName}>Living Room</Text>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
        <RoomStatsBar />
        <RoomActiveDevices />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  roomName: {
    color: "#ffff",
    fontWeight: "600",
    fontSize: 17,
    opacity: 0.9,
    textAlign: "center",
  },
  backButtonIcon: {
    color: "#ffff",
  },
  button: {
    paddingLeft: 20,
  },
  image: {
    width: "100%",
    height: 210,
    resizeMode: "cover",
  },
  child: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default RoomScreen;
