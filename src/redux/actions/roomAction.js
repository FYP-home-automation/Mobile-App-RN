import {
  SAMPLE,
  GET_ALL_ROOM_SUCCESSFULLY,
  GET_ALL_ROOM_FAILED,
} from '../types';
import { axiosInstance } from 'HomeAutomation/src/utils/API';

export const setNumber = num => ({
  type: SAMPLE,
  num,
});

export const fetchAllRooms = () => {
  return async function (dispatch, getState) {
    try {
      // const result = await axiosInstance.get('/room');
      // console.log('result testing ', result);
      dispatch({
        type: GET_ALL_ROOM_SUCCESSFULLY,
        // payload: result.data,
        paylod: [{ testing: 'kevin' }, { testing: 'kevin 2' }],
      });
    } catch (e) {
      dispatch({
        type: GET_ALL_ROOM_FAILED,
      });
    }
  };
};
