import {
  GET_ALL_ROOM_SUCCESSFULLY,
  GET_ALL_ROOM_FAILED,
  SET_ACTIVE_ROOM,
  LOADING_ROOM_LIST,
} from '../types';
import { axiosInstance } from 'HomeAutomation/src/utils/API';

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
    dispatch({
      type: LOADING_ROOM_LIST,
    });

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
