import livingRoom from 'HomeAutomation/src/assets/livingRoom.png';
import kitchen from 'HomeAutomation/src/assets/kitchen.png';

export const capitalize = string => string[0].toUpperCase() + string.slice(1);

export const statsSymbolMappper = {
  temp: '°C',
  humidity: '%',
  brightness: 'lux',
};

export const roomTypeImageMapper = {
  'Living Room': livingRoom,
  Kitchen: kitchen,
  Bedroom: null,
  None: null,
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
