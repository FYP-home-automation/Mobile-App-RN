import { SAMPLE } from "../types";

const initialState = {
  count: 1,
};

const increment = (state = initialState, action) => {
  switch (action.type) {
    case SAMPLE:
      return {
        count: action.num,
      };
    default:
      return state;
  }
};

export default increment;
