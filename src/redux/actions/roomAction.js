import {
  SAMPLE,
  GET_ALL_ROOM_SUCCESSFULLY,
  GET_ALL_ROOM_FAILED,
  SET_ACTIVE_ROOM,
} from '../types';
import { axiosInstance } from 'HomeAutomation/src/utils/API';

export const setNumber = num => ({
  type: SAMPLE,
  num,
});

export const setActiveRoomID = roomId => {
  return function (dispatch) {
    dispatch({
      type: SET_ACTIVE_ROOM,
      payload: roomId,
    });
  };
};

export const fetchAllRooms = () => {
  return async function (dispatch) {
    try {
      const result = await axiosInstance.get('/room');
      dispatch({
        type: GET_ALL_ROOM_SUCCESSFULLY,
        payload: result.data,
      });
    } catch (e) {
      dispatch({
        type: GET_ALL_ROOM_FAILED,
      });
    }
  };
};
