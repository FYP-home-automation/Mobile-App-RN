import React from 'react';
import { View } from 'react-native';

import livingRoom from 'HomeAutomation/src/assets/livingRoom.png';
import kitchen from 'HomeAutomation/src/assets/kitchen.png';
import bathroom from 'HomeAutomation/src/assets/bathroom.jpg';
import bedroom from 'HomeAutomation/src/assets/bedroom.jpg';
import room from 'HomeAutomation/src/assets/room.jpg';

export const capitalize = string => string[0].toUpperCase() + string.slice(1);

// gateways
export const countNumDevice = gateways => {
  if (!gateways) {
    return 0;
  }
  let count = 0;

  gateways.map(gateway => {
    count += gateway?.devices.length;
  });

  return count;
};

export const statsSymbolMappper = {
  temp: '°C',
  humidity: '%',
  brightness: 'lux',
};

export const roomTypeImageMapper = {
  'Living Room': livingRoom,
  Kitchen: kitchen,
  Bedroom: bedroom,
  Bathroom: bathroom,
  None: room,
  Others: room,
};

export const statsIconNameMapper = {
  temp: 'thermometer',
  humidity: 'water',
  brightness: 'md-flashlight',
};

export const deviceIconNameMapper = {
  Trashbin: 'ios-trash',
  Lamp: 'ios-bulb',
  Tv: 'tv',
  Printer: 'md-print',
};

export const roomNumColorMapper = {
  0: 'black',
  1: 'orange',
  2: 'blue',
  3: 'cyan',
  4: 'green',
  5: 'gray',
  6: 'pink',
  7: 'yellow',
};

export const roomNumColorMapperArray = Object.values(roomNumColorMapper).slice(
  1,
  roomNumColorMapper.length
);

export const colorMapperList = roomNumColorMapperArray.map((color, id) => {
  return {
    label: '',
    value: id + 1,
    icon: () => (
      <View
        style={{
          backgroundColor: color,
          width: 10,
          height: 10,
        }}
      ></View>
    ),
  };
});

export const MACAdd = [
  '8C:AA:B5:83:FE:8C',
  'B4:E6:2D:FA:51:69',
  '8C:AA:B5:84:02:08',
  '8C:AA:B5:84:05:78',
];
