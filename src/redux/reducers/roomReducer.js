import {
  GET_ALL_ROOM_SUCCESSFULLY,
  GET_ALL_ROOM_FAILED,
  SET_ACTIVE_ROOM,
  ADD_NEW_ROOM_SUCCESSFULLY,
  ADD_NEW_DEVICE_SUCCESSFULLY,
  LOADING_ROOM_LIST,
  SET_TRANSCRIPTION,
} from '../types';

const initialState = {
  roomList: [],
  activeRoomId: null,
  loading: true,
  transcription: '',
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ROOM_LIST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEW_DEVICE_SUCCESSFULLY:
      const roomList = state.roomList;
      const room = roomList[action.activeRoomId];
      const gateway = room.gateways[0];
      gateway.devices = [...gateway.devices, action.payload];

      return {
        ...state,
        roomList: [...roomList],
      };
    case ADD_NEW_ROOM_SUCCESSFULLY:
      return {
        ...state,
        roomList: [action.payload, ...state.roomList],
      };
    case SET_ACTIVE_ROOM:
      return {
        ...state,
        activeRoomId: action.payload,
      };
    case GET_ALL_ROOM_SUCCESSFULLY:
      return {
        ...state,
        roomList: action.payload,
        loading: false,
      };
    case GET_ALL_ROOM_FAILED:
      return {
        ...state,
        roomList: [],
      };
    case SET_TRANSCRIPTION:
      return {
        ...state,
        transcription: action.payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
