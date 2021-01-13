import { combineReducers } from "redux";
import sampleReducer from "./sampleReducer";
import roomReducer from "./roomReducer";

export default combineReducers({
  sample: sampleReducer,
  room: roomReducer,
});
