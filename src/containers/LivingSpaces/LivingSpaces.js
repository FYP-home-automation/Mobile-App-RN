import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { Room } from 'HomeAutomation/src/constants';
import Carousel from 'react-native-snap-carousel';
import livingRoom from 'HomeAutomation/src/assets/livingRoom.png';
import kitchen from 'HomeAutomation/src/assets/kitchen.png';
import { capitalize } from 'HomeAutomation/src/utils/global';
import { setActiveRoomID } from 'HomeAutomation/src/redux/actions';

import { connect } from 'react-redux';

const roomTypeImageMapper = {
  'Living Room': livingRoom,
  Kitchen: kitchen,
  Bedroom: null,
  None: null,
};

const LivingSpaces = ({ navigation, roomList, setActiveRoomID }) => {
  const countNumDevice = gateways => {
    let count = 0;

    gateways.map(gateway => {
      count += gateway?.devices.length;
    });

    return count;
  };

  const renderItem = ({ item }) => {
    const numDevices = countNumDevice(item.gateways);

    const pressRoom = () => {
      setActiveRoomID(item._id);
      navigation.navigate(Room);
    };

    return (
      <TouchableOpacity onPress={pressRoom}>
        <ImageBackground
          source={roomTypeImageMapper['Living Room']}
          style={styles.imageBackground}
          imageStyle={{ borderRadius: 15 }}
        >
          <Text style={styles.roomName}>{capitalize(item.name)}</Text>
          <Text style={styles.devices}>
            {numDevices ? `${numDevices}` : 'No'} Devices Present
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Living Spaces</Text>
      <View style={styles.carousel}>
        <Carousel
          layout={'default'}
          data={roomList}
          sliderWidth={260}
          itemWidth={260}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = { setActiveRoomID };

const styles = StyleSheet.create({
  devices: {
    color: 'white',
    fontWeight: '500',
  },
  roomName: {
    color: 'white',
    fontWeight: '600',
  },
  carousel: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageBackground: {
    height: 230,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'flex-end',
    padding: 10,
  },
  container: {},
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 30,
  },
});

export default connect(null, mapDispatchToProps)(LivingSpaces);
