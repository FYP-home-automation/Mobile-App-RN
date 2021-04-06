import { SET_LENGTH, SET_WIDTH, SET_FLOORPLAN, SET_LOADING } from '../types';

const initialState = {
  length: 0,
  width: 0,
  data: {},
  loading: false,
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
    default:
      return state;
  }
};

export default trackingReducer;
