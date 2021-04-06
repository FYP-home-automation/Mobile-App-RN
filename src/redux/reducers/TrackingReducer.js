import {
  SET_LENGTH,
  SET_WIDTH,
  SET_FLOORPLAN,
  SET_LOADING,
  SET_ROOM_NUM,
} from '../types';

const initialState = {
  length: 0,
  width: 0,
  data: {},
  loading: false,
  roomNum: 0,
};

const trackingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LENGTH:
      return {
        ...state,
        length: action.payload,
      };
    case SET_WIDTH:
      return {
        ...state,
        width: action.payload,
      };
    case SET_FLOORPLAN:
      return {
        ...state,
        data: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ROOM_NUM: {
      return {
        ...state,
        roomNum: action.payload,
      };
    }
    default:
      return state;
  }
};

export default trackingReducer;
