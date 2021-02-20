import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { Room } from 'HomeAutomation/src/constants';
import Carousel from 'react-native-snap-carousel';

import {
  capitalize,
  roomTypeImageMapper,
  countNumDevice,
} from 'HomeAutomation/src/utils/global';
import { RoomModal } from 'HomeAutomation/src/components';
import { setActiveRoomID } from 'HomeAutomation/src/redux/actions';

import { connect } from 'react-redux';

const skeletonDummyData = [
  {
    title: 'Item 1',
    text: 'Text 1',
  },
  {
    title: 'Item 2',
    text: 'Text 2',
  },
];

const LivingSpaces = ({ navigation, roomList, setActiveRoomID, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item: room, index }) => {
    const numDevices = countNumDevice(room.gateways);

    const pressRoom = () => {
      setActiveRoomID(index);
      navigation.navigate(Room);
    };

    return (
      <>
        {loading ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item marginLeft={25}>
                <SkeletonPlaceholder.Item
                  width={230}
                  height={230}
                  borderRadius={15}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          <TouchableOpacity onPress={pressRoom}>
            <ImageBackground
              source={roomTypeImageMapper[room.room_type]}
              style={styles.imageBackground}
              imageStyle={{ borderRadius: 15 }}
            >
              <Text style={styles.roomName}>{capitalize(room.name)}</Text>
              <Text style={styles.roomType}>
                {room.room_type !== 'None' ? room.room_type : 'Room'}
              </Text>
              <Text style={styles.devices}>
                {numDevices ? `${numDevices}` : 'No'} Devices Present
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.livingSpacesHeader}>
        <Text style={styles.title}>Your Living Spaces</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="ios-add-circle-outline" style={styles.addButtonIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.carousel}>
        <Carousel
          layout={'default'}
          data={loading ? skeletonDummyData : roomList}
          sliderWidth={260}
          itemWidth={260}
          renderItem={renderItem}
        />
      </View>
      <RoomModal
        modalVisible={modalVisible}
        onClose={state => setModalVisible(state)}
      />
    </View>
  );
};

const mapDispatchToProps = { setActiveRoomID };

const styles = StyleSheet.create({
  addButtonIcon: {
    marginRight: 30,
  },
  livingSpacesHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomType: {
    color: 'white',
    fontWeight: '500',
  },
  devices: {
    color: 'white',
    fontWeight: '400',
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
