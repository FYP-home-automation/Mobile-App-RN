import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import { deviceIconNameMapper } from 'HomeAutomation/src/utils/global';

const DeviceBox = ({ name, type, on, onPress }) => {
  const renderIcon = () => (
    <View style={styles.icon}>
      <Icon
        name={
          deviceIconNameMapper[type] ? deviceIconNameMapper[type] : 'md-switch'
        }
      />
    </View>
  );
  const colorStyles = {
    backgroundColor: on ? '#05FFD2' : '#A9A9A9',
  };

  const renderStatus = () => {
    return on ? <Text>ON</Text> : <Text>OFF</Text>;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, colorStyles]}>
        <View style={styles.inline}>
          {renderIcon()}
          {renderStatus()}
        </View>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  container: {
    width: 90,
    height: 85,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
});

export default DeviceBox;
