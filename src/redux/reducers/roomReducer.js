import { GET_ALL_ROOM_SUCCESSFULLY, GET_ALL_ROOM_FAILED } from "../types";

const initialState = {
  roomList: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROOM_SUCCESSFULLY:
      return {
        roomList: action.payload,
        ...state,
      };
    case GET_ALL_ROOM_FAILED:
      return {
        roomList: [],
        ...state,
      };
    default:
      return state;
  }
};

export default roomReducer;
