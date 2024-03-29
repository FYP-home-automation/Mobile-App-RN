import React, { useEffect, useState } from 'react';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { countNumDevice } from 'HomeAutomation/src/utils/global';
import { DeviceBox } from 'HomeAutomation/src/components';
import { StyleSheet, Text, View } from 'react-native';
import { DeviceModal } from 'HomeAutomation/src/components';

const RoomActiveDevices = ({ room, activeRoomId }) => {
  const devices = room.gateways.map(gateway => gateway.devices);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const numDevices = countNumDevice(room.gateways);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const dummyDevice = [null, null, null, null, null, null];

  const renderList = () => {
    if (loading) {
      return dummyDevice.map(item => (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={90}
            height={90}
            borderRadius={10}
            margin={10}
          />
        </SkeletonPlaceholder>
      ));
    } else {
      if (devices.length <= 0) {
        return null;
      }

      return devices[0].map((device, id) => (
        <DeviceBox
          name={device.name}
          type={device.device_type}
          on={id == 2 || id == 4 ? false : true}
          onPress={() => {
            // const newData = [...dummyData];
            // newData[id].on = !newData[id].on;
            // setDummyData(newData);
          }}
        />
      ));
    }
  };

  // TODO: Integrate With Back-end
  return (
    <View style={styles.flexStyle}>
      <View style={styles.container}>
        <View style={styles.roomDeviceTopSection}>
          <Text style={styles.title}>
            {numDevices
              ? `${numDevices} Active Devices`
              : 'No Active Devices Present'}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="ios-add-circle-outline" style={styles.addButtonIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.deviceBoxContainer, ...styles.flexStyle }}>
          {renderList()}
        </View>
      </View>
      <DeviceModal
        modalVisible={modalVisible}
        onClose={state => setModalVisible(state)}
        activeRoomId={activeRoomId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexStyle: {
    display: 'flex',
    alignItems: 'center',
  },
  addButtonIcon: {
    marginRight: 17,
  },
  roomDeviceTopSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    display: 'flex',
    borderColor: 'black',
    width: '90%',
    marginTop: 10,
  },
  deviceBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default RoomActiveDevices;
