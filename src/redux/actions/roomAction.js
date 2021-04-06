import {
  GET_ALL_ROOM_SUCCESSFULLY,
  GET_ALL_ROOM_FAILED,
  SET_ACTIVE_ROOM,
  LOADING_ROOM_LIST,
  ADD_NEW_ROOM_SUCCESSFULLY,
  ADD_NEW_ROOM_FAILED,
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

export const addNewRoom = ({ name, room_type }) => {
  return async function (dispatch) {
    try {
      const result = await axiosInstance.post('/room', {
        name,
        room_type,
      });
      dispatch({
        type: ADD_NEW_ROOM_SUCCESSFULLY,
        payload: result.data,
      });
    } catch (e) {
      dispatch({
        type: ADD_NEW_ROOM_FAILED,
      });
    }
  };
};
