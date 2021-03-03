import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import roomReducer from './roomReducer';
import trackingReducer from './TrackingReducer';

export default combineReducers({
  sample: sampleReducer,
  tracking: trackingReducer,
  room: roomReducer,
});
