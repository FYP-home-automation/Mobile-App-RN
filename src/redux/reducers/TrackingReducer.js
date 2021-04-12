import {
  SET_LENGTH,
  SET_WIDTH,
  SET_FLOORPLAN,
  SET_LOADING,
  SET_ROOM_NUM,
  SET_FLOORPLAN_ID,
  SET_ROOMNUM_TO_TYPE,
} from '../types';

const initialState = {
  length: 21.3,
  width: 20.7,
  floorplanId: 0,
  data: {},
  loading: false,
  roomNum: 0,
  roomNumToType: {},
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
    case SET_FLOORPLAN_ID:
      return {
        ...state,
        floorplanId: action.payload,
      };

    case SET_ROOMNUM_TO_TYPE:
      return {
        ...state,
        roomNumToType: action.payload,
      };
    default:
      return state;
  }
};

export default trackingReducer;
