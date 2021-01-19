import { GET_ALL_ROOM_SUCCESSFULLY, GET_ALL_ROOM_FAILED } from '../types';

const initialState = {
  roomList: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROOM_SUCCESSFULLY:
      return {
        ...state,
        roomList: action.payload,
      };
    case GET_ALL_ROOM_FAILED:
      return {
        ...state,
        roomList: [],
      };
    default:
      return state;
  }
};

export default roomReducer;
