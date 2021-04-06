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
  3: 'yellow',
  4: 'pink',
  5: 'cyan',
  6: 'green',
  7: 'gray',
};
