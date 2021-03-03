import { SET_LENGTH, SET_WIDTH } from '../types';

const initialState = {
  length: 0,
  width: 0,
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
    default:
      return state;
  }
};

export default trackingReducer;
